import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';

@Component({
  selector: 'season',
  templateUrl: 'season.component.html',
  styleUrls: ['season.component.scss']
})
export class SeasonComponent implements OnInit {
  public myForm: FormGroup;
  public toDate = '2021';
  public tournaments = [
    {
        name: 'Ранкинг Турнир No 1',
        location: 'Stix, София',
        date: '19/10/2020'
    },
    {
        name: 'Ранкинг Турнир No 2',
        location: 'The Acasemy, София',
        date: '22/11/2020'
    },
    {
        name: 'Ранкинг Турнир No 3',
        location: 'Emotion, София',
        date: '16/12/2020'
    }
    ];
  public showTournment = false;

  constructor(private formBuilder: FormBuilder,
              public toastController: ToastController,
              public popoverController: PopoverController,
              private alertController: AlertController) {
    this.initForm();
  }
  ngOnInit() {
    this.showTournment = true;
    if (this.tournaments.length === 0) {
        this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Няма въведени турнири за този сезон.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentAlertConfirm(tournamentName: string) {
    const alert = await this.alertController.create({
      header: 'Изтриване на турнир ' + tournamentName,
      message: 'Сигурен ли си, че искаш да изтриеш турнира?',
      buttons: [
        {
          text: 'Не',
          role: 'cancel',
        },
        {
          text: 'Да',
          handler: () => {
            // изтриване на турнира
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
    this.tournamentsResult();
  }

  async presentPopover(tournament: Object) {
    const popover = await this.popoverController.create({
      component: NewTournamentComponent,
      cssClass: 'my-custom-class',
      componentProps: { tournament },
      translucent: true
    });
    return await popover.present();
  }

  tournamentsResult(): void {
    if (this.myForm.controls['toDate'].value === '2018') {
        this.tournaments = [];
    } else {
        this.tournaments = [
          {
              name: 'Ранкинг Турнир No 1',
              location: 'Stix, София',
              date: '19/10/2020'
          },
          {
              name: 'Ранкинг Турнир No 2',
              location: 'The Acasemy, София',
              date: '22/11/2020'
          },
          {
              name: 'Ранкинг Турнир No 3',
              location: 'Emotion, София',
              date: '16/12/2020'
          }
          ];
    }
    if (this.tournaments.length === 0) {
        this.presentToast();
    }
    }
}
