import {Injectable} from "@angular/core";
import {AngularFirestore, QueryFn} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {map, Observable} from "rxjs";

import {ChatDetails} from "../features/chats/model/interfaces/chat.interface";
import {JoinedEvent} from "../shared/models/interfaces/user";


@Injectable({
  providedIn: 'root'
})
export class FirestoreApiService {

  constructor(private firestore: AngularFirestore) {}

  setDocument(path: string, data: any) {
    return this.firestore.doc(path).set(data);
  }

  getDocById(path: string) {
    return this.firestore.doc(path).valueChanges();
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
    const { name, image } = chatDetails
    const chatData = { eventId, name, image, messages: [] };
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
}
