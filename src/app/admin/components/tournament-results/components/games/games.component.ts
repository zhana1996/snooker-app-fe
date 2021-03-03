import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { IPlayers, ITournamentParticipants } from 'src/app/admin/store/models/tournamentsParams';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { IUser } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';

@Component({
  selector: 'games',
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  @Input() tournament: ITournament;
  numberOfPlayers = 0;
  allPlayers: IPlayers[] = [];
  onePlayer: IUser;
  showResults = false;

  private players$: Observable<ITournamentParticipants>;
  private playersSubs: Subscription;
  private tournament$: Observable<Object>;
  private tournamentSubs: Subscription;

  constructor(public modalController: ModalController,
              private toaster: ToasterService,
              private facade: AdminFacade) {
    this.players$ = this.facade.shuffleUsers$;
    this.tournament$ = this.facade.tournamentById$;
  }

  ngOnInit(): void {
    this.facade.getTournamentByID(this.tournament.id);

    this.playersSubs = this.players$.subscribe((data: ITournamentParticipants) => {
      if (data) {
        if (data.players.length > 0) {
          this.allPlayers = data.players;
          this.showResults = true;
        } else {
          this.allPlayers = [];
          this.showResults = false;
          if (!data.numberOnePlayer) {
            this.toaster.showToaster('Няма записани играчи до този момент', 'danger');
          }
        }
        this.onePlayer = data.numberOnePlayer || null;
      }
    }); 
    
    this.tournamentSubs = this.tournament$.subscribe((data: ITournament) => {
      if (data) {
        this.numberOfPlayers = data.tournamentParticipants.length;
      }
    });
  }

  shufflePlayers(): void {
    this.facade.shuffleUsers(this.tournament.id);
  }

  closeModal(): void {
    this.allPlayers = [];
    this.showResults = false;
    this.onePlayer = null;
    this.facade.resetShuffleUsers();
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.playersSubs.unsubscribe();
    this.tournamentSubs.unsubscribe();
  }
}
