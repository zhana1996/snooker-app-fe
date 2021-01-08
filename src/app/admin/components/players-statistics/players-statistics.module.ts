import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersStatisticsRoutingModule } from './players-statistics-routing.module';
import { PlayersStatisticsComponent } from './players-statistics.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayersStatisticsRoutingModule
  ],
  declarations: [
   PlayersStatisticsComponent,
   EditPlayerComponent
],
  providers: []
})
export class PlayersStatisticsModule {}
