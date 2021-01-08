import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from '../../store/facade/folder.facade';
import { IUser } from '../../store/models/players';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'players',
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {
  private player$: Observable<IUser[]>;
  private playersSubs: Subscription;
  public players: IUser[] = [];

  constructor(public router: Router,
              public facade: FolderFacade,
              public toaster: ToasterService,
              public modalController: ModalController) {
    this.player$ = this.facade.players$;
  }
  ngOnInit() {
    this.facade.getAllPlayers('');
    this.playersSubs = this.player$.subscribe((data: IUser[]) => {
      if (data) {
        if (data.length > 0) {
          this.players = data;
        } else {
          this.players = [];
          this.toaster.showToaster('Няма намерени играчи', 'danger');
        }
      }
    })
  }

  async presentModal(player: IUser) {
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

  getAllPlayersByGender(gender: string): void {
    this.facade.getAllPlayers(gender);
  }

  ngOnDestroy(): void {
    this.playersSubs.unsubscribe();
  }
}
