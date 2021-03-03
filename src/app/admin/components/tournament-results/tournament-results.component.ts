import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { GamesComponent } from './components/games/games.component';
import { TournamentGamesResultsComponent } from './components/tournament-games-results/tournament-games-results.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { AdminFacade } from '../../store/facade/admin.facade';
import { Observable, Subscription } from 'rxjs';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { AdminService } from '../../store/services/admin.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tournament-results',
  templateUrl: 'tournament-results.component.html',
  styleUrls: ['tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;
  public toDate = '2021';
  public season = '2020/2021';

  public tournaments: ITournament[] = [];
  private tournament$: Observable<ITournament[]>;
  private tournamentSubs: Subscription;

  public showTournment = false;

  constructor(private formBuilder: FormBuilder,
              private transfer: FileTransfer,
              private previewAnyFile: PreviewAnyFile,
              private fileChooser: FileChooser,
              public router: Router,
              public toaster: ToasterService,
              private facade: AdminFacade,
              public modalController: ModalController,
              public popoverController: PopoverController) {
    this.tournament$ = this.facade.tournaments$;
    this.initForm();
  }

  ionViewWillEnter(): void {
    this.facade.getTournaments({season: this.season});
  }

  ngOnInit() {
    this.tournamentSubs = this.tournament$.subscribe((data: ITournament[]) => {
      if (data) {
        if (data.length > 0) {
          this.tournaments = data;
          this.showTournment = true;
        } else {
          this.tournaments = [];
          this.showTournment = false;
          this.toaster.showToaster('Няма качени турнири до този момент', 'danger');
        }
      }
    });
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

  async openFileChoose(tournament: ITournament): Promise<void> {
    const file = await this.fileChooser.open();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const result = await fileTransfer.upload(file, `${environment.API_URL}/file-storage/upload`, { fileName: 'tournament.pdf', mimeType: 'application/pdf' });
    console.log(result);
    if (result.responseCode === 201) {
      const file = JSON.parse(result.response);
      tournament = {
        ...tournament,
        fileName: file.filename
     };
     this.facade.editTournament(tournament);
     this.facade.getTournaments({ season: this.season });
    }
  }

  async downLoadFile(tournament: ITournament): Promise<void> {
    const result = await this.previewAnyFile.preview(`${environment.API_URL}/uploads/${tournament.fileName}`);
    console.log(result);
  }

  private convertBlobToBase64 = (blob: Blob) =>
     new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    });
  
  private initForm(): void {
    this.myForm = this.formBuilder.group({
      fromDate: ['2020', Validators.required],
      toDate: ['2021', Validators.required]
    });
  }

  changeFromDate(): void {
    const fromDate = this.myForm.controls['fromDate'].value.substring(0,4);
    this.myForm.controls['toDate'].setValue((+fromDate + 1).toString());
    this.season = fromDate + '/' + this.myForm.controls['toDate'].value;
    this.facade.getTournaments({season: this.season});
  }

  navigateToLogin(): void {
    this.router.navigate(['./admin']);
  }

  ngOnDestroy(): void {
    this.tournamentSubs.unsubscribe;
  }
}
