import {Injectable} from '@angular/core';
import {PushNotificationSchema} from "@capacitor/push-notifications";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastController: ToastController,
  ) {}

  handleNotification(notification: PushNotificationSchema): void {
    this.showNotification(notification);
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
