import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FolderFacade } from '../../store/facade/folder.facade';
import { IUser } from '../../store/models/players';
import { IEarliestTournament } from '../../store/models/tournament';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  readonly env = environment;
  tournament: IEarliestTournament;
  players: IUser[] = [];
  showEarliestTournament = false;
  style: string[] = [];
  isPlayerParticipant = false;
  month: string;
  day: number;
  year: number;
  time: string;
  clubName: string;
  city: string;
  timeLeft: number = 60;
  interval;
  minutes: number;
  hours: number;
  days: number;

  private tournament$: Observable<IEarliestTournament>;
  private tournamentSubs: Subscription;
  private players$: Observable<IUser[]>;
  private playersSubs: Subscription;
  private monthNames = ["Яну", "Фев", "Март", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"];

  constructor(public router: Router,
              private facade: FolderFacade,
              public route: ActivatedRoute,
              private alertController: AlertController) {
    this.tournament$ = this.facade.tournament$;
    this.players$ = this.facade.users$;
  }

  ionViewWillEnter(): void {
    this.facade.getEarliestTournament();
  }

  ngOnInit() {
    this.facade.getAllUsersByTitles();

    this.tournamentSubs = this.tournament$.subscribe((data: IEarliestTournament) => {
      if(data) {
        this.tournament = data;
        if (this.tournament.tournament) {
          const dayOfTournament = new Date(this.tournament.tournament.startDate);
          this.showEarliestTournament = true;
          this.day = dayOfTournament.getUTCDate();
          this.month = this.monthNames[dayOfTournament.getMonth()];
          this.year = dayOfTournament.getFullYear();
          this.time = (dayOfTournament.getHours() - 2).toString() + ':' + (dayOfTournament.getMinutes()).toString();
          this.clubName = this.tournament.tournament.place.split(',')[0];
          this.city = this.tournament.tournament.place.split(',')[1];
          this.minutes = this.tournament.minutes;
          this.hours = this.tournament.hours - 2;
          this.days = this.tournament.days;
          this.setInterval();
          console.log(this.time);
          this.isPlayerParticipant = this.tournament.isParticipating;
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

  ngOnDestroy(): void {
    this.tournamentSubs.unsubscribe();
    this.playersSubs.unsubscribe();
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

  setInterval(): void {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 59;
        if (this.minutes > 0) {
          this.minutes--;
        } else {
          this.minutes = 59;
          if (this.hours > 0) {
            this.hours--;
          } else {
            this.hours = 23;
            if (this.days > 0) {
              this.days--;
            } else {
              this.days = this.hours = this.minutes = this.timeLeft =  0;
              clearInterval(this.interval);
            }
          }
        }
      }
    },1000)
  }
}
