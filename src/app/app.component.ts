import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Начало',
      url: '/folder/homePage',
      icon: 'extension-puzzle'
    },
    {
      title: 'Новини',
      url: '/folder/news',
      icon: 'newspaper'
    },
    {
      title: 'Резултати',
      url: '/folder/scores/months',
      icon: 'stats-chart'
    },
    {
      title: 'Турнири',
      url: '/folder/tournaments',
      icon: 'cube'
    },
    {
      title: 'Играчи',
      url: '/folder/players',
      icon: 'people'
    }
  ];
  public labels = ['Класация', 'Предстоящ турнир', 'Запиши се за турнир', 'Тренировка'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
