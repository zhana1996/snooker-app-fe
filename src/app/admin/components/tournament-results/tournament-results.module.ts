import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentResultsRoutingModule } from './tournament-results-routing.module';
import { TournamentResultsComponent } from './tournament-results.component';
import { GamesComponent } from './components/games/games.component';
import { TournamentGamesResultsComponent } from './components/tournament-games-results/tournament-games-results.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TournamentResultsRoutingModule
  ],
  declarations: [
   TournamentResultsComponent,
   GamesComponent,
   TournamentGamesResultsComponent
],
  providers: []
})
export class TournamentResultsModule {}
