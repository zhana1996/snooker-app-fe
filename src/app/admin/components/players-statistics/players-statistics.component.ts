import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

@Component({
  selector: 'players-statistics',
  templateUrl: 'players-statistics.component.html',
  styleUrls: ['players-statistics.component.scss']
})
export class PlayersStatisticsComponent implements OnInit {
  public players = [
    {
        name: 'Братислав Кръстев',
        id: 1,
        age: '31',
        break: '123',
        club: 'The Academy, София',
        startPeriod: '2001',
        titles: 12,
        rank: 1,
        wins: 30,
        lost: 49,
        matches: 115,
        points: 234,
        img: 'assets/images/profile_1.png'
    },
    {
      name: 'Георги Величков',
      id: 2,
      age: '25',
      break: '141',
      club: 'The Academy, София',
      startPeriod: '2001',
      titles: 24,
      rank: 2,
      wins: 45,
      lost: 35,
      matches: 140,
      points: 234,
      img: 'assets/images/profile_2.png'
  },
  {
      name: 'Виктор Гайдов',
      id: 3,
      age: '31',
      break: '89',
      club: 'The Academy, София',
      startPeriod: '2001',
      titles: 1,
      rank: 3,
      wins: 30,
      lost: 49,
      matches: 115,
      points: 234,
      img: 'assets/images/profile_3.png'
  },
  {
      name: 'Теодор Чомовски',
      id: 4,
      age: '22',
      break: '119',
      club: 'The Academy, София',
      startPeriod: '2001',
      titles: 9,
      rank: 0,
      wins: 30,
      lost: 49,
      matches: 115,
      points: 234,
      img: 'assets/images/profile_1.png'
  }
]
      public showResults = false;
    
      constructor(public toastController: ToastController,
                  public popoverController: PopoverController,
                  public alertController: AlertController) {}
      ngOnInit() {
          if(this.players.length > 0) {
              this.showResults = true;
          } else {
            this.presentToast();
          }
      }
    
      async presentToast() {
        const toast = await this.toastController.create({
          message: 'Няма играчи',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
  
      async deletePlayer(player_id: string) {
          const alert = await this.alertController.create({
            header: 'Премахване на играч',
            message: 'Сигурен ли сте, че искате да изтриете играча?',
            buttons: [
              {
                text: 'Не',
                role: 'cancel',
              },
              {
                text: 'Да',
                handler: () => {
                  // изтриване на играча
                },
              },
            ],
          });
      
          await alert.present();
        }
  
        async editPlayer(player: string) {
          const popover = await this.popoverController.create({
            component: EditPlayerComponent,
            cssClass: 'my-custom-class',
            componentProps: { player },
            translucent: true
          });
          return await popover.present();
        }
}
