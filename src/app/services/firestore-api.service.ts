import {Injectable} from "@angular/core";
import {AngularFirestore, QueryFn} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {map, Observable} from "rxjs";


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

  createChatForEvent(eventId: string): Promise<any> {
    const chatData = {
      eventId: eventId,
      messages: []
    };
    return this.firestore.collection('chats').add(chatData);
  }

  linkEventWithChat(eventId: string, chatId: string): Promise<void> {
    return this.firestore.doc(`events/${eventId}`).update({chatId: chatId});
  }
}
