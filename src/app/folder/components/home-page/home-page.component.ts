import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { FolderFacade } from '../../store/facade/folder.facade';
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

  public showEarliestTournament = false;

  constructor(public router: Router,
              private facade: FolderFacade,
              public route: ActivatedRoute,
              private alertController: AlertController) {
    this.tournament$ = this.facade.tournament$;
  }
  ngOnInit() {
    this.facade.getEarliestTournament();

    this.tournamentSubs = this.tournament$.subscribe((data: IEarliestTournament) => {
      if(data) {
        this.tournament = data;
        if (this.tournament.tournament) {
          this.showEarliestTournament = true;
        } else {
          this.showEarliestTournament = false;
        }
      } else {
        this.showEarliestTournament = false;
      }
    });
  }

  goToStatisticsPage(): void {
    this.router.navigate(['./statistics'], { relativeTo: this.route });
  }

  goToWorkoutPage(): void {
    this.router.navigate(['./workout'], { relativeTo: this.route });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Записване за турнир ' + this.tournament.tournament.name,
      message: 'Сигурен ли си, че искаш да се запишеш за турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            // записване за турнира
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
