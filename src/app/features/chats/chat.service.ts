import {Injectable} from "@angular/core";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";

import {FirestoreApiService} from "../../services/firestore-api.service";
import {AuthState} from "../../state/auth";


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
}
