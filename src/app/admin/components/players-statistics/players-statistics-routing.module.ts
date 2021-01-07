import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersStatisticsComponent } from './players-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersStatisticsRoutingModule {}
