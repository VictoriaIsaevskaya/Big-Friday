import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Platform, ToastController } from '@ionic/angular';
import { Store } from "@ngxs/store";
import { tap } from 'rxjs/operators';

import { AuthState } from "../state/auth";

import { FirestoreApiService } from "./firestore-api.service";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private firestoreApiService: FirestoreApiService,
    private store: Store,
    private toastController: ToastController,
  ) {
    this.init();
  }
  init() {
    this.receiveMessages();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  requestPermission() {
    console.log(Notification.permission)
    if (Notification.permission === 'granted') {
      console.log('Permission has already been granted');
      this.getToken();
    } else if (Notification.permission !== 'denied') {
      this.afMessaging.requestPermission.pipe(
        tap(() => {
          console.log('Permission granted!');
          this.getToken();
        }),
      ).subscribe();
    }
  }

  getToken() {
    this.afMessaging.getToken.subscribe(
      (token) => {
        console.log('Token:', token);
        const userId = this.store.selectSnapshot(AuthState.user).uid;
        if (token) {
          this.firestoreApiService.updateUserFcmToken(userId, token)
            .then(() => console.log('FCM Token updated successfully'))
            .catch(error => console.error('Error updating FCM Token:', error));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  receiveMessages() {
    this.afMessaging.messages.pipe(
      tap((message) => {
        console.log('New message received:', message);
        this.showNotification(message.notification);
      }),
    ).subscribe();
  }

  public showNotification(message) {
    const notificationMessage = `New message from ${message.senderName}: ${message.text}`;
    this.showToast(notificationMessage);
  }
}
