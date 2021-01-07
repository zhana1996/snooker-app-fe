import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CoachApproveComponent } from './components/coach-approve/coach-approve.component';
import { PlayersStatisticsComponent } from './components/players-statistics/players-statistics.component';
import { SeasonComponent } from './components/season/season.component';
import { SnookerNewsComponent } from './components/snooker-news/snooker-news.component';
import { TournamentResultsComponent } from './components/tournament-results/tournament-results.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'season',
    component: SeasonComponent
  },
  {
    path: 'tournament-results',
    component: TournamentResultsComponent
  },
  {
    path: 'coach-approve',
    component: CoachApproveComponent
  },
  {
    path: 'snooker-news',
    component: SnookerNewsComponent
  },
  {
    path: 'players-statistics',
    component: PlayersStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
