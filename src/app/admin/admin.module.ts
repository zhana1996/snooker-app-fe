import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SeasonComponent } from './components/season/season.component';
import { TournamentResultsComponent } from './components/tournament-results/tournament-results.component';
import { GamesComponent } from './components/tournament-results/components/games/games.component';
import { TournamentGamesResultsComponent } from './components/tournament-results/components/tournament-games-results/tournament-games-results.component';
import { CoachApproveComponent } from './components/coach-approve/coach-approve.component';
import { SnookerNewsComponent } from './components/snooker-news/snooker-news.component';
import { AddNewsComponent } from './components/snooker-news/components/add-news.component';
import { PlayersStatisticsComponent } from './components/players-statistics/players-statistics.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
   AdminComponent,
   SeasonComponent,
   TournamentResultsComponent,
   GamesComponent,
   TournamentGamesResultsComponent,
   CoachApproveComponent,
   SnookerNewsComponent,
   AddNewsComponent,
   PlayersStatisticsComponent
],
  providers: []
})
export class AdminModule {}
