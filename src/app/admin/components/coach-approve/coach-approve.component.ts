import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'coach-approve',
  templateUrl: 'coach-approve.component.html',
  styleUrls: ['coach-approve.component.scss']
})
export class CoachApproveComponent implements OnInit {
    public coaches = [
      {
          name: 'Георги Величков',
          id: '1',
          location: 'The Academy, София',
          number: '0885121855',
          img: 'assets/images/profile_1.png'
      }
      ];
    public showResults = false;
  
    constructor(public toastController: ToastController,
                public alertController: AlertController) {}
    ngOnInit() {
        if(this.coaches.length > 0) {
            this.showResults = true;
        } else {
          this.presentToast();
        }
    }
  
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Няма нови регистрации на учители.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }

    async deleteRegistration(coach_id: string) {
        const alert = await this.alertController.create({
          header: 'Премахване на регистрация',
          message: 'Сигурен ли сте, че искате да изтриете заявката?',
          buttons: [
            {
              text: 'Не',
              role: 'cancel',
            },
            {
              text: 'Да',
              handler: () => {
                // изтриване на регистрацията
              },
            },
          ],
        });
    
        await alert.present();
      }

      async approveRegistration(tournamentName: string) {
        const alert = await this.alertController.create({
          header: 'Приемане на регистрация',
          message: 'Сигурен ли сте, че искате да приемете заявката?',
          buttons: [
            {
              text: 'Не',
              role: 'cancel',
            },
            {
              text: 'Да',
              handler: () => {
                // добавяне на регистрацията
              },
            },
          ],
        });
    
        await alert.present();
      }
}
