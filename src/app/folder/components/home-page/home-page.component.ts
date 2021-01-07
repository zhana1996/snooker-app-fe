import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public nextTournament = 'Ранкинг Турнир 5';
  constructor(public router: Router,
              public route: ActivatedRoute,
              private alertController: AlertController) {}
  ngOnInit() {}

  goToStatisticsPage(): void {
    this.router.navigate(['./statistics'], { relativeTo: this.route });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Записване за турнир ' + this.nextTournament,
      message: 'Сигурен ли си, че искаш да се запишеш за турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            // записване за турнира
          },
        },
      ],
    });

    await alert.present();
  }
}
