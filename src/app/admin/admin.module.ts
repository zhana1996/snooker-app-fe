import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminStoreModule } from './store/admin-store.module';
import { AdminService } from './store/services/admin.services';
import { AdminFacade } from './store/facade/admin.facade';
import { PlayersStatisticsModule } from './components/players-statistics/players-statistics.module';
import { SeasonModule } from './components/season/season.module';
import { TournamentResultsModule } from './components/tournament-results/tournament-results.module';
import { CoachApproveModule } from './components/coach-approve/coach-approve.module';
import { SnookerNewsModule } from './components/snooker-news/snooker-news.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    PlayersStatisticsModule,
    SeasonModule,
    TournamentResultsModule,
    CoachApproveModule,
    SnookerNewsModule,
    AdminStoreModule
  ],
  declarations: [
   AdminComponent
],
  providers: [AdminService, AdminFacade]
})
export class AdminModule {}
