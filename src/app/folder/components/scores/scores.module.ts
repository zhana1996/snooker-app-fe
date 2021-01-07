import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoresComponent } from './scores.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { MonthTournamentsComponent } from './components/month-tournaments/month-tournaments.component';
import { MonthsComponent } from './components/months/months.component';
import { TournamenScoreComponent } from './components/tournament-score/tournament-score.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoresRoutingModule
  ],
  declarations: [
      ScoresComponent,
      MonthTournamentsComponent,
      MonthsComponent,
      TournamenScoreComponent
    ],
  providers: []
})
export class ScoresModule {}
