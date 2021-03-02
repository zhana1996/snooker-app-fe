import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { ITournamentParticipants } from 'src/app/admin/store/models/tournamentsParams';
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

  public players: IUser[] = [];
  public onePlayer: IUser;
  private players$: Observable<ITournamentParticipants>;
  private playersSubs: Subscription;

  public numberOfPlayers = 0;
  private tournament$: Observable<Object>;
  private tournamentSubs: Subscription;

  public showResults = false;

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
          this.players = data.players;
          this.showResults = true;
        } else {
          this.players = [];
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

  ngOnDestroy(): void {
    this.playersSubs.unsubscribe();
  }
}
