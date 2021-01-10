import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workout',
  templateUrl: 'workout.component.html',
  styleUrls: ['workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  public userRole: string;
  constructor() {
      this.userRole = localStorage.getItem('role');
  }
  ngOnInit(): void {}
}
