import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from 'src/app/folder/store/facade/folder.facade';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'month-tournaments',
  templateUrl: 'month-tournaments.component.html',
  styleUrls: ['month-tournaments.component.scss']
})
export class MonthTournamentsComponent implements OnInit, OnDestroy {
  month: number;
  year: number;
  tournaments: ITournament[] = [];
  private tournaments$: Observable<ITournament[]>;
  private tournamentsSubs: Subscription;

  constructor(public router: Router,
              private previewAnyFile: PreviewAnyFile,
              private facade: FolderFacade,
              private toaster: ToasterService,
              public route: ActivatedRoute) {
    this.month = +this.route.snapshot.paramMap.get('month');
    this.year = +this.route.snapshot.paramMap.get('year');
    this.tournaments$ = this.facade.tournaments$;
  }

  ngOnInit(): void {
    this.facade.getTournaments({month: this.month, year: this.year});

    this.tournamentsSubs = this.tournaments$.subscribe((data: ITournament[]) => {
      if(data) {
        if(data.length > 0) {
          this.tournaments = data;
        } else {
          this.tournaments = [];
          this.toaster.showToaster('Няма въведени турнири през този период', 'danger');
        }
        this.facade.resetTournaments();
      }
    });
  }

  ngOnDestroy(): void {
    this.tournamentsSubs.unsubscribe();
  }

  goToTournamentScores(id: string): void {
    this.router.navigate(['./tournament-score/id/' + id ], { relativeTo: this.route });
  }

  async downLoadFile(tournament: ITournament): Promise<void> {
    const result = await this.previewAnyFile.preview(`${environment.API_URL}/uploads/${tournament.fileName}`);
    console.log(result);
  }
}
