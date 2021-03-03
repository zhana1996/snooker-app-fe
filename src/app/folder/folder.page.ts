import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Observable, Subscription } from 'rxjs';
import { FolderFacade } from './store/facade/folder.facade';
import { ToasterService } from '../core/services/toaster/toaster.service';
import { platformBrowser } from '@angular/platform-browser';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folder: string;

  constructor(private activatedRoute: ActivatedRoute,
              private facade: FolderFacade,
              public router: Router,
              private toasterService: ToasterService,
              private platform: Platform,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.platform.is('cordova')) {
      PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          if (!token?.value) {
            return;
          }
          this.facade.getTokenResponse(localStorage.getItem('id'), token.value);
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          //alert('Push received: ' + JSON.stringify(notification));
          console.log(notification);
          const { data } = notification;

          if (data.type === 'PLAYER_APPLY') {
            console.log(data);
            this.toasterService.showToaster(`${data.playerName} зaпази тренировка от ${new Date(data.trainingStartDate).getUTCHours() + ':' + new Date(data.trainingStartDate).getMinutes()} на ${new Date(data.trainingStartDate).toISOString().split('T')[0]} в ${data.club}`, 'success', 9000);
          }
        }
      );
  
      // Method called when tapping on a notification
      // PushNotifications.addListener('pushNotificationActionPerformed',
      //   (notification: PushNotificationActionPerformed) => {
      //     alert('Push action performed: ' + JSON.stringify(notification));
      //   }
      // );
    }
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    this.navCtrl.navigateRoot('/login');
  }

}
