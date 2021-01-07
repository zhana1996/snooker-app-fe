import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'players',
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.scss']
})
export class PlayersComponent implements OnInit {
  public players = [
      {
          name: 'Братислав Кръстев',
          age: '31',
          break: '123',
          club: 'The Academy, София',
          startPeriod: '2001',
          titles: 12,
          rank: 2,
          wins: 30,
          lost: 49,
          matches: 115,
          points: 234,
          img: 'assets/images/profile_1.png'
      },
      {
        name: 'Георги Величков',
        age: '25',
        break: '141',
        club: 'The Academy, София',
        startPeriod: '2001',
        titles: 24,
        rank: 1,
        wins: 45,
        lost: 35,
        matches: 140,
        points: 234,
        img: 'assets/images/profile_2.png'
    },
    {
        name: 'Виктор Гайдов',
        age: '31',
        break: '89',
        club: 'The Academy, София',
        startPeriod: '2001',
        titles: 1,
        rank: 4,
        wins: 30,
        lost: 49,
        matches: 115,
        points: 234,
        img: 'assets/images/profile_3.png'
    },
    {
        name: 'Теодор Чомовски',
        age: '22',
        break: '119',
        club: 'The Academy, София',
        startPeriod: '2001',
        titles: 9,
        rank: 3,
        wins: 30,
        lost: 49,
        matches: 115,
        points: 234,
        img: 'assets/images/profile_1.png'
    }
  ];
  constructor(public router: Router,
              public modalController: ModalController) {}
  ngOnInit() {}

  async presentModal(player: Object) {
    const modal = await this.modalController.create({
      component: PlayerComponent,
      componentProps: { player },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) {
      return;
    }
  }
}
