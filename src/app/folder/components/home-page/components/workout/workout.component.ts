import { Component } from '@angular/core';

@Component({
  selector: 'workout',
  templateUrl: 'workout.component.html',
  styleUrls: ['workout.component.scss']
})
export class WorkoutComponent {
  userRole: string;

  constructor() {
      this.userRole = localStorage.getItem('role');
  }

}
