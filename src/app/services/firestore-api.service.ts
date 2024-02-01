import {Injectable} from "@angular/core";
import {AngularFirestore, DocumentReference, QueryFn} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {combineLatest, map, Observable} from "rxjs";

import {ChatDetails, ChatMessage, ChatParticipant} from "../features/chats/model/interfaces/chat.interface";
import {JoinedEvent, User} from "../shared/models/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class FirestoreApiService {

  constructor(private firestore: AngularFirestore) {}

  setDocument(path: string, data: any) {
    return this.firestore.doc(path).set(data);
  }

  addMessageToChat(chatId: string, message: any): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(`chats/${chatId}/messages`).add(message);
  }

  getDocById(path: string) {
    return this.firestore.doc(path).valueChanges();
  }

  updateChatLastMessage(chatId: string, lastMessage: any): Promise<void> {
    return this.firestore.doc(`chats/${chatId}`).update({ lastMessage });
  }

  collectionRef(path) {
    return this.firestore.collection(path)
  }

  collectionDataQuery(path: string, queryFn?: QueryFn): Observable<any[]> {
    return this.firestore.collection(path, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data: { [key: string]: any } = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  whereQuery(fieldPath: string, condition: firebase.firestore.WhereFilterOp, value: any): QueryFn {
    return ref => ref.where(fieldPath, condition, value);
  }

  createEvent(eventDetails: any): Promise<any> {
    return this.firestore.collection('events').add(eventDetails);
  }

  createChatForEvent(eventId: string, chatDetails: ChatDetails): Promise<any> {
    const { name, image, participants } = chatDetails
    const details = { name, image, eventId, participants }
    const chatData = { details, messages: [], loadingMessages: false, hasError: false, lastMessage: false };
    return this.firestore.collection('chats').add(chatData);
  }

  linkEventWithChat(eventId: string, chatId: string): Promise<void> {
    return this.firestore.doc(`events/${eventId}`).update({chatId: chatId});
  }

  updateEvent(eventId: string, eventData: any): Promise<void> {
    return this.firestore.collection('events').doc(eventId).update(eventData);
  }

  joinUserToEvent(uid: string, events: JoinedEvent[]) {
    return this.firestore.collection('users').doc(uid).update({ joinedEvents: events });
  }

  updateUserFcmToken(userId: string, fcmToken: string): Promise<void> {
    if (!userId) {
      return Promise.reject(new Error("No user ID provided"));
    }
    return this.firestore.doc(`users/${userId}`).update({ fcmToken });
  }

  removeFromUserJoinedEvents(userId: string, eventId: string): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef.ref);
      const user = userDoc.data() as User;

      if (user && user.joinedEvents) {
        const updatedJoinedEvents = user.joinedEvents.filter((joinedEvent) => joinedEvent.eventId !== eventId);
        transaction.update(userRef.ref, { joinedEvents: updatedJoinedEvents });
      }
    });
  }

  getChatMessages(chatId: string): Observable<ChatMessage[]> {
    return this.firestore.collection<ChatMessage>(`chats/${chatId}/messages`, ref => ref.orderBy('timestamp')).valueChanges();
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.firestore.collection('events').doc(eventId).delete();
  }

  resetAllUnreadMessagesCount(userId: string): Promise<void> {
    return this.firestore.doc(`users/${userId}`).update({ unreadMessagesCount: 0 });
  }

  resetChatUnreadMessages(chatId: string, userId: string): Promise<void> {
    return this.firestore.doc(`chats/${chatId}`).get().toPromise().then((chatDoc) => {
      if (!chatDoc.exists) {
        throw new Error("Chat not found");
      }
      const chatData = chatDoc.data() as any;
      const participants: ChatParticipant[] = chatData.details.participants;
      const updatedParticipants = participants.map((participant) => {
        if (participant.userId === userId) {
          return { ...participant, unreadMessagesCount: 0 };
        }
        return participant;
      });

      return this.firestore.doc(`chats/${chatId}`).update({ 'details.participants': updatedParticipants });
    });
  }


  getUnreadMessagesCount(userId: string): Observable<number> {
    return this.firestore.doc<{unreadMessagesCount: number}>(`users/${userId}`)
      .valueChanges()
      .pipe(map(data => data ? data.unreadMessagesCount : 0));
  }

  async addParticipantToChat(chatId: string, newParticipant: ChatParticipant): Promise<void> {
    const chatRef = this.firestore.doc(`chats/${chatId}`);
    return chatRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        let chatData = doc.data() as any;
        let updatedParticipants = chatData && Array.isArray(chatData.details.participants)
          ? [...chatData.details.participants, newParticipant]
          : [newParticipant];
        return chatRef.update({ 'details.participants': updatedParticipants });
      } else {
        throw new Error("Chat not found");
      }
    });
  }

  getChatsUnreadMessagesCount(chatIds: string[], userId: string): Observable<{ [chatId: string]: number }> {
    const unreadCounts$ = chatIds.map(chatId =>
      this.firestore.doc<{ details: { participants: ChatParticipant[] } }>(`chats/${chatId}`).valueChanges().pipe(
        map(chat => {
          const participant = chat.details.participants?.find(p => p.userId === userId);
          return { [chatId]: participant?.unreadMessagesCount || 0 };
        })
      )
    );
    return combineLatest(unreadCounts$).pipe(
      map(countsArray => countsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
    );
  }


}
