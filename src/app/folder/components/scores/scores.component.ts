import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'scores',
  templateUrl: 'scores.component.html',
  styleUrls: ['scores.component.scss']
})
export class ScoresComponent {
  constructor(public router: Router) {}
}
