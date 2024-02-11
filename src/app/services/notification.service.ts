import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {PushNotificationSchema} from "@capacitor/push-notifications";
import {ToastController} from "@ionic/angular";
import {filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private chatId: string;
  currentUrl: string;
  constructor(
    private toastController: ToastController,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  handleNotification(notification: PushNotificationSchema): void {
    const shouldShowToast = !this.currentUrl.includes(notification.data.chatId);
    if (shouldShowToast) {
      this.showNotification(notification);
    }
  }

  showNotification(notification: PushNotificationSchema) {
    const { title, body } = notification;
    const text = `${title} - ${body}`;
    this.presentToast(text);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
