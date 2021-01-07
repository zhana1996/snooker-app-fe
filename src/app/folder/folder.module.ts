import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { HomePageModule } from './components/home-page/home-page.module';
import { PlayersModule } from './components/players/players.module';
import { NewsModule } from './components/news/news.module';
import { ScoresModule } from './components/scores/scores.module';
import { TournamentsModule } from './components/tournaments/tournaments.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    HomePageModule,
    PlayersModule,
    NewsModule,
    ScoresModule,
    TournamentsModule
  ],
  declarations: [
    FolderPage]
})
export class FolderPageModule {}
