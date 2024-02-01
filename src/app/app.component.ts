import {Component, NgZone} from '@angular/core';
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { AlertController, Platform } from "@ionic/angular";
import { register } from 'swiper/element/bundle';

import { AuthService } from "./services/auth.service";
import { FirestoreApiService } from "./services/firestore-api.service";
import { MessagingService } from "./services/messaging.service";
import { NotificationService } from "./services/notification.service";

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private firestoreApiService: FirestoreApiService,
    private messagingService: MessagingService,
    private alertController: AlertController,
    private notificationService: NotificationService,
    private ngZone: NgZone,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => Capacitor.isPluginAvailable('PushNotifications') && this.platform.is('hybrid') ? this.registerNotifications() : this.messagingService.requestPermission());
  }

  private async registerPush() {
    const userId = this.authService.getCurrentUserId();
    PushNotifications.addListener('registration', token => {
      this.firestoreApiService.updateUserFcmToken(userId, token.value);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      this.ngZone.run(() => this.notificationService.handleNotification(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      const data = notification.notification.data;
      const chatId = data.chatId;
      if (chatId) {
        this.router.navigateByUrl(`/chats/${chatId}`);
      }
    });
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive === 'granted') {
      await PushNotifications.register().then(() => this.registerPush());
    }
  }
}
