import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { AdminFacade } from '../../store/facade/admin.facade';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';

@Component({
  selector: 'season',
  templateUrl: 'season.component.html',
  styleUrls: ['season.component.scss']
})
export class SeasonComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;
  public season = '2020/2021';
  public toDate = '2021';
  public showTournment = false;

  public tournaments: ITournament[] = [];
  private tournaments$: Observable<ITournament[]>;
  private tournamentsSubs: Subscription;

  private deleteTournament$: Observable<ITournament>;
  private deleteTournamentSubs: Subscription;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public toaster: ToasterService,
              private facade: AdminFacade,
              public popoverController: PopoverController,
              private alertController: AlertController) {
    this.initForm();
    this.tournaments$ = this.facade.tournaments$;
    this.deleteTournament$ = this.facade.deleteTournament$;
  }
  ngOnInit() {
    this.facade.getTournaments({season: this.season});

    this.tournamentsSubs = this.tournaments$.subscribe((data: ITournament[]) => {
      if(data) {
        if(data.length > 0) {
          this.tournaments = data;
          this.showTournment = true;
        } else {
          this.showTournment = false;
          this.toaster.showToaster('Няма въведени турнири за този сезон.', 'danger');
        }
      }
    });

    this.deleteTournamentSubs = this.deleteTournament$.subscribe((data: ITournament) => {
      if(data) {
        this.toaster.showToaster('Успешно изтрихте турнира', 'success');
        this.facade.getTournaments({season: this.season});
      }
    });
  }

  async deleteTournament(tournament: ITournament) {
    const alert = await this.alertController.create({
      header: 'Изтриване на турнир ' + tournament.name,
      message: 'Сигурни ли сте, че искате да изтриете турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            this.facade.deleteTournament(tournament.id);
          },
        },
      ],
    });

    await alert.present();
  }

  private initForm(): void {
    this.myForm = this.formBuilder.group({
      fromDate: ['2020', Validators.required],
      toDate: ['2021', Validators.required]
    });
  }

  changeFromDate(): void {
    const fromDate = this.myForm.controls['fromDate'].value.substring(0,4);
    this.myForm.controls['toDate'].setValue((+fromDate + 1).toString());
    console.log({
        fromDate: fromDate,
        toDate: this.myForm.controls['toDate'].value
    });
    this.season = fromDate + '/' + this.myForm.controls['toDate'].value;
    this.facade.getTournaments({season: this.season});
  }

  async presentPopover(event?: Object) {
    const popover = await this.popoverController.create({
      component: NewTournamentComponent,
      cssClass: 'my-custom-class',
      componentProps: { tournament: event['tournament'], season: event['season'], edit: event['edit'] },
      translucent: true
    });
    return await popover.present();
  }

  ngOnDestroy(): void {
    this.tournamentsSubs.unsubscribe();
    this.deleteTournamentSubs.unsubscribe();
  }
}
