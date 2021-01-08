import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { IUser } from 'src/app/folder/store/models/players';
import { AdminFacade } from '../../store/facade/admin.facade';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

@Component({
  selector: 'players-statistics',
  templateUrl: 'players-statistics.component.html',
  styleUrls: ['players-statistics.component.scss']
})
export class PlayersStatisticsComponent implements OnInit, OnDestroy {
  private players$: Observable<IUser[]>;
  private playersSubs: Subscription;
  public players: IUser[] = [];

  public showResults = false;
    
  constructor(public toaster: ToasterService,
              public popoverController: PopoverController,
              private facade: AdminFacade,
              public alertController: AlertController) {
    this.players$ = this.facade.players$;
  }
  ngOnInit() {
    this.facade.getAllPlayers('');
    this.playersSubs = this.players$.subscribe((data: IUser[]) => {
      if (data) {
        if(data.length > 0) {
          this.players = data;
          this.showResults = true;
        } else {
          this.players = [];
          this.showResults = false;
          this.toaster.showToaster('Няма играчи', 'danger');
        }
      }
    });
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
          this.facade.deletePlayer(player_id);
          this.facade.getAllPlayers('');
        },
        },],
      });
      
    await alert.present();
    }
  
  async editPlayer(player: IUser) {
    const popover = await this.popoverController.create({
      component: EditPlayerComponent,
      cssClass: 'my-custom-class',
      componentProps: { player },
      translucent: true
      });
    return await popover.present();
  }

  ngOnDestroy(): void {
    this.playersSubs.unsubscribe();
  }
}
