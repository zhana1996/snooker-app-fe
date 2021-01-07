import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season.component';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SeasonRoutingModule
  ],
  declarations: [
   SeasonComponent,
   NewTournamentComponent
],
  providers: []
})
export class SeasonModule {}
