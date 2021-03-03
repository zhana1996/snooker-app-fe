import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { IUser } from 'src/app/folder/store/models/players';
import { environment } from 'src/environments/environment';
import { AdminFacade } from '../../store/facade/admin.facade';

@Component({
  selector: 'coach-approve',
  templateUrl: 'coach-approve.component.html',
  styleUrls: ['coach-approve.component.scss']
})
export class CoachApproveComponent implements OnInit, OnDestroy {
    readonly env = environment;
    users: IUser[] = [];
    selectedRole = 'TRAINER';
    showResults = false;
    trainerButton = true;

    private users$: Observable<IUser[]>;
    private usersSubs: Subscription;
  
    constructor(public toaster: ToasterService,
                public router: Router,
                private facade: AdminFacade,
                public alertController: AlertController) {
      this.users$ = this.facade.disabledUsers$;
    }

    ngOnInit() {
      this.facade.getDisabledUsers(this.selectedRole);

      this.usersSubs = this.users$.subscribe((data: IUser[]) => {
        if(data) {
          if(data.length > 0) {
            this.users = data;
            this.showResults = true;
          } else {
            let user = this.selectedRole === 'TRAINER' ? 'треньори' : 'играчи';
            this.users = [];
            this.showResults = false;
            this.toaster.showToaster(`Няма чакащи за одобрение ${user}`, 'success');
          }
        }
      });
    }

    async deleteRegistration(user_id: string) {
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
                this.facade.deletePlayer(user_id);
                setTimeout(() => {
                  this.facade.getDisabledUsers(this.selectedRole);
                }, 1500);
              },
            },
          ],
        });
    
        await alert.present();
      }

      async approveRegistration(userId: string) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
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
                this.facade.approveUser(userId);
                this.toaster.showToaster('Успешно одобрихте регистрацията', 'success');
                setTimeout(() => {
                  this.facade.getDisabledUsers(this.selectedRole);
                }, 1500);
              },
            },
          ],
        });
    
        await alert.present();
      }

      getAllPlayersByRole(role: string): void {
        this.selectedRole = role;
        this.trainerButton = this.selectedRole === 'TRAINER';
        this.facade.getDisabledUsers(role);
      }

      ngOnDestroy(): void {
        this.usersSubs.unsubscribe();
      }
}
