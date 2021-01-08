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
import { FolderStoreModule } from './store/folder-store.module';
import { FolderFacade } from './store/facade/folder.facade';
import { FolderService } from './store/services/folder.services';

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
    TournamentsModule,
    FolderStoreModule
  ],
  declarations: [FolderPage],
  providers: [FolderFacade, FolderService]
})
export class FolderPageModule {}
