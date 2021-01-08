import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { GamesComponent } from './components/games/games.component';
import { TournamentGamesResultsComponent } from './components/tournament-games-results/tournament-games-results.component';

@Component({
  selector: 'tournament-results',
  templateUrl: 'tournament-results.component.html',
  styleUrls: ['tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit {
  public myForm: FormGroup;
  public toDate = '2021';
  public tournaments = [
    {
        name: 'Ранкинг Турнир No 1',
        location: 'Stix, София',
        type: 'next',
        date: '19/10/2020'
    },
    {
        name: 'Ранкинг Турнир No 2',
        location: 'The Acasemy, София',
        type: '',
        date: '22/11/2020'
    },
    {
        name: 'Ранкинг Турнир No 3',
        location: 'Emotion, София',
        type: '',
        date: '16/12/2020'
    }
    ];
  public showTournment = false;

  constructor(private formBuilder: FormBuilder,
              public toaster: ToasterService,
              public modalController: ModalController,
              public popoverController: PopoverController) {
    this.initForm();
  }
  ngOnInit() {
    this.showTournment = true;
    if (this.tournaments.length === 0) {
        this.toaster.showToaster('Няма въведени турнири за този сезон.', 'danger');
    }
  }

  async openGamesModal(tournament: Object) {
    const modal = await this.modalController.create({
      component: GamesComponent,
      componentProps: { tournament },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) {
      return;
    }
  }

  async openGamesResults(tournament: Object) {
    const modal = await this.modalController.create({
      component: TournamentGamesResultsComponent,
      componentProps: { tournament },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) {
      return;
    }
  }

  private initForm(): void {
    this.myForm = this.formBuilder.group({
      fromDate: ['2020', Validators.required],
      toDate: ['2021', Validators.required]
    });
  }

  changeFromDate(): void {
    const fromDate = this.myForm.controls['fromDate'].value.substring(0,4);
    this.myForm.controls['toDate'].setValue((+fromDate - 1).toString());
    console.log({
        fromDate: fromDate,
        toDate: this.myForm.controls['toDate'].value
    });
    this.tournamentsResult();
  }

  tournamentsResult(): void {
    if (this.myForm.controls['toDate'].value === '2018') {
        this.tournaments = [];
    } else {
        this.tournaments = [
          {
              name: 'Ранкинг Турнир No 1',
              location: 'Stix, София',
              type: 'next',
              date: '19/10/2020'
          },
          {
              name: 'Ранкинг Турнир No 2',
              location: 'The Acasemy, София',
              type: '',
              date: '22/11/2020'
          },
          {
              name: 'Ранкинг Турнир No 3',
              location: 'Emotion, София',
              type: '',
              date: '16/12/2020'
          }
          ];
    }
    if (this.tournaments.length === 0) {
      this.toaster.showToaster('Няма въведени турнири за този сезон.', 'danger');
    }
  }
}
