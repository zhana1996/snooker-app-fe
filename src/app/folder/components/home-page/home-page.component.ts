import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { FolderFacade } from '../../store/facade/folder.facade';
import { IUser } from '../../store/models/players';
import { IEarliestTournament } from '../../store/models/tournament';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public tournament: IEarliestTournament;
  private tournament$: Observable<IEarliestTournament>;
  private tournamentSubs: Subscription;

  public players: IUser[] = [];
  private players$: Observable<IUser[]>;
  private playersSubs: Subscription;

  public showEarliestTournament = false;
  public style: string[] = [];

  public isPlayerParticipant = false;

  constructor(public router: Router,
              private facade: FolderFacade,
              public route: ActivatedRoute,
              private alertController: AlertController) {
    this.tournament$ = this.facade.tournament$;
    this.players$ = this.facade.users$;
  }
  ngOnInit() {
    this.facade.getEarliestTournament();
    this.facade.getAllUsersByTitles();

    this.tournamentSubs = this.tournament$.subscribe((data: IEarliestTournament) => {
      if(data) {
        this.tournament = data;
        if (this.tournament.tournament) {
          this.showEarliestTournament = true;
          this.isPlayerParticipant = this.tournament.tournament.tournamentParticipants.length > 0;
        } else {
          this.showEarliestTournament = false;
        }
      } else {
        this.showEarliestTournament = false;
      }
    });

    this.playersSubs = this.players$.subscribe((data: IUser[]) => {
      if(data) {
        if(data.length > 0) {
          this.players = data;
          const highestTitles = this.players[0].userDetails.titles;
          for(let i = 0; i < this.players.length; i++) {
            const percentages = Math.round((this.players[i].userDetails.titles / highestTitles) * 100) + '%';
            this.style.push('linear-gradient(90deg, #ce132d '+ percentages +', black '+ percentages + ', black 100%)');
          }
        } else {
            this.players = [];
        }
      }
    });
  }

  goToStatisticsPage(): void {
    this.router.navigate(['./statistics'], { relativeTo: this.route });
  }

  goToWorkoutPage(): void {
    this.router.navigate(['./workout'], { relativeTo: this.route });
  }

  async addPlayerInTournament() {
    const alert = await this.alertController.create({
      header: 'Записване за турнир: ' + this.tournament.tournament.name,
      message: 'Сигурен ли си, че искаш да се запишеш за турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            this.facade.addPlayerToTournament({
              id: this.tournament.tournament.id
            });
            this.isPlayerParticipant = true;
          },
        },
      ],
    });

    await alert.present();
  }

  async deletePlayerInTournament() {
    const alert = await this.alertController.create({
      header: 'Отписване от турнир: ' + this.tournament.tournament.name,
      message: 'Сигурен ли си, че искаш да се отпишеш от турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            this.facade.deletePlayerFromTournamet(this.tournament.tournament.id);
            this.isPlayerParticipant = false;
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this.tournamentSubs.unsubscribe();
  }
}
