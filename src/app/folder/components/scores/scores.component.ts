import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'scores',
  templateUrl: 'scores.component.html',
  styleUrls: ['scores.component.scss']
})
export class ScoresComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit() {}
}
