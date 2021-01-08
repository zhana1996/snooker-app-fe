import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentResultsComponent } from './tournament-results.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentResultsRoutingModule {}
