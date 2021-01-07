import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersStatisticsRoutingModule } from './players-statistics-routing.module';
import { PlayersStatisticsComponent } from './players-statistics.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayersStatisticsRoutingModule
  ],
  declarations: [
   PlayersStatisticsComponent
],
  providers: []
})
export class PlayersStatisticsModule {}
