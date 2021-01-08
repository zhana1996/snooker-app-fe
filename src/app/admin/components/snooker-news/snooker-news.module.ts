import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnookerNewsComponent } from './snooker-news.component';
import { SnookerNewsRoutingModule } from './snooker-news-routing.module';
import { AddNewsComponent } from './components/add-news.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SnookerNewsRoutingModule
  ],
  declarations: [
   SnookerNewsComponent,
   AddNewsComponent
],
  providers: []
})
export class SnookerNewsModule {}
