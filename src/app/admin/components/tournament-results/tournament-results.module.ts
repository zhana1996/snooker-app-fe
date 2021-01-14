import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentResultsRoutingModule } from './tournament-results-routing.module';
import { TournamentResultsComponent } from './tournament-results.component';
import { GamesComponent } from './components/games/games.component';
import { TournamentGamesResultsComponent } from './components/tournament-games-results/tournament-games-results.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';

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
  providers: [FileTransfer, FileChooser, File]
})
export class TournamentResultsModule {}
