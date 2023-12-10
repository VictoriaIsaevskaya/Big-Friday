import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {FirestoreApiService} from "../../services/firestore-api.service";
import {AuthState} from "../../state/auth";

import {ChatRoom} from "./model/interfaces/chat.interface";


@Injectable({
  providedIn: 'root'
})

export class ChatService {
  users: Observable<any>
  currentUserId: string;
  constructor(private store: Store, private api: FirestoreApiService) {
  }

  getId() {
    this.currentUserId = this.store.selectSnapshot(AuthState.user).uid
  }

  getUsers() {
    return this.api.collectionDataQuery('users', this.api.whereQuery('uid', '!=', this.currentUserId));
  }

  loadAllChats(chatIds: string[]): Observable<ChatRoom[]> {
    if (!chatIds.length) {
      return throwError(() => new Error("No chat IDs provided"));
    }

    const queryFn = (ref) => ref.where('__name__', 'in', chatIds);

    return this.api.collectionDataQuery('chats', queryFn)
      .pipe(
        catchError(error => throwError(() => new Error(error)))
      );
  }
}
