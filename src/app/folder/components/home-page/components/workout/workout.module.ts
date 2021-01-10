import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { WorkoutCoachComponent } from './components/workout-coach/workout-coach.component';
import { WorkoutPlayerComponent } from './components/workout-player/workout-player.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { AddNewEventComponent } from './components/workout-coach/components/add-new-event/add-new-event.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    WorkoutComponent,
    WorkoutCoachComponent,
    WorkoutPlayerComponent,
    AddNewEventComponent
  ],
  providers: []
})
export class WorkoutModule {}
