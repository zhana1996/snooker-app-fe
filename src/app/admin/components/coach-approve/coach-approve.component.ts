import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

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
  
    constructor(public toaster: ToasterService,
                public alertController: AlertController) {}
    ngOnInit() {
        if(this.coaches.length > 0) {
            this.showResults = true;
        } else {
          this.toaster.showToaster('Няма нови регистрации на учители', 'danger');
        }
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
