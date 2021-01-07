import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'month-tournaments',
  templateUrl: 'month-tournaments.component.html',
  styleUrls: ['month-tournaments.component.scss']
})
export class MonthTournamentsComponent implements OnInit {
  constructor(public router: Router,
              public route: ActivatedRoute) {}
  ngOnInit() {}

  goToTournamentScores(id: string): void {
    this.router.navigate(['./tournament-score/id/' + id ], { relativeTo: this.route });
  }
}
