import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tournament-score',
  templateUrl: 'tournament-score.component.html',
  styleUrls: ['tournament-score.component.scss']
})
export class TournamenScoreComponent implements OnInit {
  public firstStep = true;
  public secondStep = false;
  public thirdStep = false;
  public nextStep = true;
  public prevStep = false;
  constructor(public router: Router) {}
  ngOnInit() {}

  goToNextStep(): void {
    if (this.firstStep) {
      this.secondStep = true;
      this.firstStep = false;
      this.prevStep = true;
    } else if (this.secondStep) {
      this.secondStep = false;
      this.thirdStep = true;
      this.prevStep = true;
      this.nextStep = false;
    }
  }

  goToPreviousStep(): void {
    if(this.thirdStep) {
      this.thirdStep = false;
      this.secondStep = true;
      this.nextStep = true;
    } else if(this.secondStep) {
      this.secondStep = false;
      this.firstStep = true;
      this.prevStep = false;
    }
  }
}
