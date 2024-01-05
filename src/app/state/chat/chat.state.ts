import {Injectable} from "@angular/core";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {map, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {ChatService} from "../../features/chats/chat.service";
import {ChatMessage, ChatRoom} from "../../features/chats/model/interfaces/chat.interface";
import {FirestoreApiService} from "../../services/firestore-api.service";

import {
  LoadChatMessages,
  LoadCurrentChat,
  SendMessage, UpdateLastMessage,
} from "./chat.actions";


export interface ChatStateModel {
  chats: ChatRoom[];
  currentChat: ChatRoom | null;
  messages: ChatMessage[];
}

const initialState: ChatStateModel = {
  chats: [],
  currentChat: null,
  messages: []
};
@Injectable()
@State<ChatStateModel>({
  name: 'chat',
  defaults: initialState
})
export class ChatState {
  constructor(private chatService: ChatService, private firestoreApiService: FirestoreApiService) {}

  @Selector()
  static messages(state: ChatStateModel): ChatMessage[] {
    return state.messages;
  }

  @Selector()
  static currentChatDetails(state: ChatStateModel): ChatRoom {
    return state.currentChat;
  }

  @Action(LoadCurrentChat)
  loadCurrentChat(ctx: StateContext<ChatStateModel>, { payload: { chatId } }: LoadCurrentChat) {
    this.chatService.loadChatById(chatId).pipe(
      map(chat =>
        ctx.patchState({
          currentChat: {...chat, id: chatId}
        })
      ),
      catchError(error => throwError(() => new Error(error)))
    ).subscribe()
  }

  @Action(SendMessage)
  sendMessage(ctx: StateContext<ChatStateModel>, { payload }: SendMessage) {
    const { chatId, message } = payload;
    return this.firestoreApiService.addMessageToChat(chatId, message).then((mess) => {
      const state = ctx.getState();
      if (state.currentChat && state.currentChat.id === chatId) {
        ctx.patchState({
          messages: [...state.messages, message]
        });
        ctx.dispatch(new UpdateLastMessage({ chatId, lastMessage: message }));
      }
    }).catch(error => console.error('Error sending message:', error));
  }

  @Action(UpdateLastMessage)
  updateLastMessage(ctx: StateContext<ChatStateModel>, { payload: { chatId, lastMessage }}: UpdateLastMessage) {
    return this.firestoreApiService.updateChatLastMessage(chatId, lastMessage).then(() => {
      const state = ctx.getState();
      const currentChatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (currentChatIndex > -1) {
        const updatedChats = [...state.chats];
        const updatedChat = {
          ...updatedChats[currentChatIndex],
          lastMessage: lastMessage
        };
        updatedChats[currentChatIndex] = updatedChat;

        ctx.patchState({
          chats: updatedChats,
          currentChat: state.currentChat && state.currentChat.id === chatId ? updatedChat : state.currentChat
        });
      }
    }).catch(error => {
      console.error('Error updating last message:', error);
    });
  }




  @Action(LoadChatMessages)
  loadChatMessages(ctx: StateContext<ChatStateModel>, { payload }: LoadChatMessages) {
    const { chatId } = payload;

    return this.firestoreApiService.getChatMessages(chatId).pipe(
      tap((messages) => {
        ctx.patchState({ messages });
      }),
      catchError(error => {
        console.error('Error loading chat messages:', error);
        return throwError(error);
      })
    );
  }
}
