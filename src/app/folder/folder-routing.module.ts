import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticComponent } from './components/home-page/components/statistics/statistics.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewsComponent } from './components/news/news.component';
import { PlayersComponent } from './components/players/players.component';
import { MonthTournamentsComponent } from './components/scores/components/month-tournaments/month-tournaments.component';
import { MonthsComponent } from './components/scores/components/months/months.component';
import { TournamenScoreComponent } from './components/scores/components/tournament-score/tournament-score.component';
import { ScoresComponent } from './components/scores/scores.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
      },
      {
        path: 'homePage/statistics',
        component: StatisticComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'tournaments',
        component: TournamentsComponent
      },
      {
        path: 'scores',
        component: ScoresComponent,
        children: [
          {
            path: 'month-tournaments/month/:month',
            component: MonthTournamentsComponent
          },
          {
            path: 'months',
            component: MonthsComponent
          },
          {
            path: 'month-tournaments/month/:month/tournament-score/id/:id',
            component: TournamenScoreComponent
          }
        ]
      },
      {
        path: 'players',
        component: PlayersComponent
      },
      {
        path: '',
        redirectTo: '/folder/homePage',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/folder/homePage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
