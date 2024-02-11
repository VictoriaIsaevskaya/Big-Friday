import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {EMPTY, take, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {ChatService} from "../../features/chats/chat.service";
import {ChatMessage, ChatRoom} from "../../features/chats/model/interfaces/chat.interface";
import {AuthService} from "../../services/auth.service";
import {FirestoreApiService} from "../../services/firestore-api.service";
import {LoadUserChats, LoadUserChatsSuccess} from "../user";

import {
  FetchChatsUnreadMessagesCount,
  FetchUnreadMessagesCount,
  LoadChatMessages,
  LoadChatMessagesSuccess,
  LoadCurrentChat,
  LoadCurrentChatSuccess,
  ResetAllUnreadMessages,
  ResetChatUnreadMessages,
  ResetChatUnreadMessagesSuccess,
  SendMessage,
  UpdateChatsUnreadMessagesCountSuccess,
  UpdateLastMessage,
  UpdateUnreadMessagesCount,
} from "./chat.actions";


export interface ChatStateModel {
  chats: ChatRoom[];
  currentChat: ChatRoom | null;
  unreadMessagesCount: number;
}

const initialState: ChatStateModel = {
  chats: [],
  currentChat: null,
  unreadMessagesCount: 0
};
@Injectable()
@State<ChatStateModel>({
  name: 'chat',
  defaults: initialState
})
export class ChatState {
  constructor(private chatService: ChatService, private firestoreApiService: FirestoreApiService,
              private authService: AuthService, private router: Router) {}

  @Selector()
  static messages(state: ChatStateModel): ChatMessage[] {
    return state.currentChat.messages;
  }

  @Selector()
  static chats(state: ChatStateModel): ChatRoom[] {
    return state.chats;
  }

  @Selector()
  static unreadMessagesCount(state: ChatStateModel): number {
    return state.unreadMessagesCount;
  }

  @Selector()
  static currentChatDetails(state: ChatStateModel): ChatRoom {
    return state.currentChat;
  }

  @Action(FetchUnreadMessagesCount)
  fetchUnreadMessagesCount({patchState}: StateContext<ChatStateModel>) {
    const currentUserId = this.authService.getCurrentUserId();

    this.firestoreApiService.getUnreadMessagesCount(currentUserId).pipe(
      tap(count => {
        patchState({ unreadMessagesCount: count });
      })).subscribe();
  }

  @Action(ResetAllUnreadMessages)
  resetAllUnreadMessages({ patchState }: StateContext<ChatStateModel>) {
    const currentUserId = this.authService.getCurrentUserId();

    patchState({ unreadMessagesCount: 0 });
    this.firestoreApiService.resetAllUnreadMessagesCount(currentUserId)
  }

  @Action(LoadCurrentChat)
  loadCurrentChat({ patchState, dispatch, getState }: StateContext<ChatStateModel>, { payload: { chatId } }: LoadCurrentChat) {
    return this.chatService.loadChatById(chatId).pipe(
      tap(chat => {
          const currentChat = {...chat, id: chatId}
          dispatch(new LoadCurrentChatSuccess({currentChat})).pipe(take(1))
        }
      ),
      catchError(error => throwError(() => new Error(error)))
    )
  }

  @Action(LoadCurrentChatSuccess)
  loadCurrentChatSuccess({ patchState, dispatch, getState }: StateContext<ChatStateModel>,
                         { payload: { currentChat } }: LoadCurrentChatSuccess) {
    patchState({
      currentChat
    });
    dispatch(new LoadChatMessages({ chatId: currentChat.id })).pipe(take(1))
  }

  @Action(SendMessage)
  sendMessage(ctx: StateContext<ChatStateModel>, { payload }: SendMessage) {
    const { chatId, message } = payload;
    return this.firestoreApiService.addMessageToChat(chatId, message).then((mess) => {
      const state = ctx.getState();
      if (state.currentChat && state.currentChat.id === chatId) {
        ctx.patchState({
          currentChat: {...state.currentChat, messages: [...state.currentChat.messages, message]}
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


  @Action(UpdateUnreadMessagesCount)
  updateUnreadMessagesCount({ patchState }: StateContext<ChatStateModel>, { payload }: UpdateUnreadMessagesCount) {
    if (payload && payload.unreadMessagesCount !== undefined) {
      patchState({ unreadMessagesCount: payload.unreadMessagesCount });

    }
  }

  @Action(LoadChatMessages)
  loadChatMessages({dispatch}: StateContext<ChatStateModel>, { payload: {chatId} }: LoadChatMessages) {
    return this.firestoreApiService.getChatMessages(chatId).pipe(
      tap((messages) => {
        dispatch(new LoadChatMessagesSuccess({chatId, messages})).pipe(take(1))
      }),
      catchError(error => {
        console.error('Error loading chat messages:', error);
        return throwError(error);
      })
    );
  }

  @Action(LoadChatMessagesSuccess)
  loadChatMessagesSuccess({getState, patchState}: StateContext<ChatStateModel>, { payload: { chatId, messages } }: LoadChatMessagesSuccess) {
    const state = getState();
    const currentChatId = state.currentChat?.id;
    if (currentChatId === chatId) {
      patchState({ currentChat: {...state.currentChat, messages}});
    }
  }

  @Action(LoadUserChats)
  loadUserChats(ctx: StateContext<ChatStateModel>, action: LoadUserChats) {
    return this.chatService.loadAllChats(action.payload.chatIds).pipe(
      tap((chats: ChatRoom[]) => {
        ctx.dispatch(new LoadUserChatsSuccess({chats}))
      }),
      catchError(err => {
        console.log(err);
        return EMPTY
      })
    )
  }

  @Action(LoadUserChatsSuccess)
  loadUserChatsSuccess(ctx: StateContext<ChatStateModel>, action: LoadUserChatsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      chats: action.payload.chats
    })
    const chatIds = action.payload.chats.map(chat => chat.id);
    ctx.dispatch(new FetchChatsUnreadMessagesCount({ chatIds }));
  }

  @Action(FetchChatsUnreadMessagesCount)
  fetchChatsUnreadMessagesCount(
    { getState, patchState, dispatch }: StateContext<ChatStateModel>,
    { payload: {chatIds} }: FetchChatsUnreadMessagesCount
  ) {
    const currentUserId = this.authService.getCurrentUserId();

    return this.firestoreApiService.getChatsUnreadMessagesCount(chatIds, currentUserId).pipe(
      take(1),
      tap(unreadMessagesCounts => dispatch(new UpdateChatsUnreadMessagesCountSuccess({ unreadMessagesCounts }))),
      catchError(error => {
        console.error('Error fetching unread messages count:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  @Action(UpdateChatsUnreadMessagesCountSuccess)
  updateChatsUnreadMessagesCountSuccess(
    { getState, patchState, dispatch }: StateContext<ChatStateModel>,
    { payload }: UpdateChatsUnreadMessagesCountSuccess
  ) {
    const state = getState();
    const currentUserId = this.authService.getCurrentUserId();
    const currentUrl = this.router.url;
    const currentChatId = currentUrl.split('/').find(part => part === 'chats') ? currentUrl.split('/')[currentUrl.split('/').indexOf('chats') + 1] : null;
    const chatsWithUpdatedCounts = state.chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          unreadMessagesCount: 0
        };
      }
      const chatUnreadCount = payload.unreadMessagesCounts[chat.id];
      const isCurrentUserParticipant = chat.details.participants?.some(p => p.userId === currentUserId);
      return {
        ...chat,
        unreadMessagesCount: isCurrentUserParticipant ? chatUnreadCount : chat.unreadMessagesCount
      };
    });
    if (currentChatId && currentUserId) {
      dispatch(new ResetChatUnreadMessagesSuccess({ chatId: currentChatId, userId: currentUserId }))
    }

    patchState({ chats: chatsWithUpdatedCounts,
      unreadMessagesCount: chatsWithUpdatedCounts.reduce((accum, curr) => accum + curr.unreadMessagesCount ?? 0, 0) });
  }

  @Action(ResetChatUnreadMessages)
  resetChatUnreadMessages(ctx: StateContext<ChatStateModel>, { payload }: ResetChatUnreadMessages) {
    if (payload) {
      return this.firestoreApiService.resetChatUnreadMessages(payload.chatId, payload.userId).then(() => {
        ctx.dispatch(new ResetChatUnreadMessagesSuccess({ chatId: payload.chatId, userId: payload.userId }));
      });
    }
    return EMPTY
  }

  @Action(ResetChatUnreadMessagesSuccess)
  resetChatUnreadMessagesSuccess(ctx: StateContext<ChatStateModel>, { payload: { chatId } }: ResetChatUnreadMessagesSuccess) {
    const state = ctx.getState();
    const updatedChats = state.chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, unreadMessagesCount: 0 };
      }
      return chat;
    });
    ctx.patchState({ chats: updatedChats });
  }


}
