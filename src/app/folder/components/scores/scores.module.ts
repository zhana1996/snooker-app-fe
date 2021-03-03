import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoresComponent } from './scores.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { MonthTournamentsComponent } from './components/month-tournaments/month-tournaments.component';
import { MonthsComponent } from './components/months/months.component';
import { TournamenScoreComponent } from './components/tournament-score/tournament-score.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

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
  providers: [FileTransfer, FileChooser, PreviewAnyFile]
})
export class ScoresModule {}
