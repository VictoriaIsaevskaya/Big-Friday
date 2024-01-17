import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Capacitor} from "@capacitor/core";
import {PushNotifications} from "@capacitor/push-notifications";
import {Platform} from "@ionic/angular";
import { register } from 'swiper/element/bundle';

import {AuthService} from "./services/auth.service";
import {FirestoreApiService} from "./services/firestore-api.service";
import {MessagingService} from "./services/messaging.service";

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router, private messagingService: MessagingService,
              private authService: AuthService, private firestoreApiService: FirestoreApiService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('PushNotifications') && this.platform.is('hybrid')) {
        this.registerNotifications();
        this.getDeliveredNotifications();
      } else {
        this.messagingService.requestPermission()
      }
    });
  }

  private async registerPush() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);

      this.firestoreApiService.updateUserFcmToken(this.authService.getCurrentUserId(), token.value)
        .then(() => console.log('Token updated in database'))
        .catch((error) => console.error('Error updating token in database', error));

    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
      alert('Registration error')
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      alert('Push notification received')

    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      alert('pushNotificationActionPerformed')
    });

  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
    alert(JSON.stringify(permStatus))

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      alert('User denied permission')
    }

    if (permStatus.receive === 'granted') {
      try {
        await PushNotifications.register().then(() => this.registerPush());
        alert('PushNotifications.register() works' )

      } catch (e) {
        alert (JSON.stringify(e))
      }
    }

  }

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    alert('delivered notifications ' + JSON.stringify(notificationList));
  }

  // private handleNotificationReceived(notification: any) {
  //   console.log('notification', notification)
  //   this.messagingService.showNotification(notification)
  // }
  //
  // private handleNotificationTap(notificationData: any) {
  //   console.log('Push action performed: ', notificationData);
  //   if (notificationData.data && notificationData.data.chatId) {
  //     this.router.navigateByUrl(`/chat/${notificationData.data.chatId}`);
  //   }
  // }
}
