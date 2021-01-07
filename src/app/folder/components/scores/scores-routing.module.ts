import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthTournamentsComponent } from './components/month-tournaments/month-tournaments.component';
import { MonthsComponent } from './components/months/months.component';
import { TournamenScoreComponent } from './components/tournament-score/tournament-score.component';
import { ScoresComponent } from './scores.component';

const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresRoutingModule {}

