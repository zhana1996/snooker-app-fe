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
import { File } from '@ionic-native/file/ngx';
import { AdminService } from '../../store/services/admin.services';
import { HttpEventType } from '@angular/common/http';
import { Filesystem, FilesystemDirectory } from '@capacitor/core';

@Component({
  selector: 'tournament-results',
  templateUrl: 'tournament-results.component.html',
  styleUrls: ['tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;
  public toDate = '2021';
  private season = '2020/2021';

  public tournaments: ITournament[] = [];
  private tournament$: Observable<ITournament[]>;
  private tournamentSubs: Subscription;

  public showTournment = false;

  constructor(private formBuilder: FormBuilder,
              private transfer: FileTransfer,
              private file: File,
              private service: AdminService,
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
    console.log(tournament);
    const file = await this.fileChooser.open();
    const fileTransfer: FileTransferObject  = this.transfer.create();
    const result = await fileTransfer.upload(file, 'http://192.168.0.101:3000/file-storage/upload');
    console.log(result);
    if (result.responseCode === 201) {
      const file = JSON.parse(result.response);
      tournament = {
        ...tournament,
        fileName: file.filename
     };
     console.log(file);
     console.log(tournament);
     this.facade.editTournament(tournament);
    }
  }

  async downLoadFile(tournament: ITournament): Promise<void> {
    const fileTransfer: FileTransferObject  = this.transfer.create();
    this.service.downloadFile(tournament.fileName).subscribe(async event => {
      if (event.type === HttpEventType.DownloadProgress) {
      } else if (event.type === HttpEventType.Response) {
        const base64 = await this.convertBlobToBase64(event.body) as string;
        const result = await Filesystem.writeFile({
          path: tournament.fileName,
          data: base64,
          directory: FilesystemDirectory.Documents
        });
      }
    });
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
