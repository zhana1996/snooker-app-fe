import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsComponent } from './tournaments.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TournamentsRoutingModule
  ],
  declarations: [TournamentsComponent],
  providers: []
})
export class TournamentsModule {}
