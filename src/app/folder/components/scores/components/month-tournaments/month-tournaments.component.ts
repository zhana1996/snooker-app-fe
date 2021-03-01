import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from 'src/app/folder/store/facade/folder.facade';
import { ITournament } from 'src/app/folder/store/models/tournament';

@Component({
  selector: 'month-tournaments',
  templateUrl: 'month-tournaments.component.html',
  styleUrls: ['month-tournaments.component.scss']
})
export class MonthTournamentsComponent implements OnInit, OnDestroy {
  public tournaments: ITournament[] = [];
  private tournaments$: Observable<ITournament[]>;
  private tournamentsSubs: Subscription;

  private month: number;
  private year: number;

  constructor(public router: Router,
              private facade: FolderFacade,
              private toaster: ToasterService,
              public route: ActivatedRoute) {
    this.month = +this.route.snapshot.paramMap.get('month');
    this.year = +this.route.snapshot.paramMap.get('year');
    this.tournaments$ = this.facade.tournaments$;
  }

  ngOnInit() {
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

  goToTournamentScores(id: string): void {
    this.router.navigate(['./tournament-score/id/' + id ], { relativeTo: this.route });
  }

  downloadTournamentResults(tournamentId: string): void {
    // download file
  }

  ngOnDestroy(): void {
    this.tournamentsSubs.unsubscribe();
  }
}
