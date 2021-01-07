import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'months',
  templateUrl: 'months.component.html',
  styleUrls: ['months.component.scss']
})
export class MonthsComponent implements OnInit {
  constructor(public router: Router,
              public route: ActivatedRoute) {}
  ngOnInit() {}

  goToTournaments(month: string): void {
    this.router.navigate(['../month-tournaments/month/' + month ], { relativeTo: this.route });
  }
}
