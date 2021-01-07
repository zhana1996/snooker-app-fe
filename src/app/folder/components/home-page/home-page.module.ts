import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { StatisticComponent } from './components/statistics/statistics.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePageComponent,
    StatisticComponent
  ],
  providers: []
})
export class HomePageModule {}
