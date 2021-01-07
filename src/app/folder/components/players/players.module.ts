import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayersRoutingModule
  ],
  declarations: [
      PlayersComponent,
      PlayerComponent
    ],
  providers: []
})
export class PlayersModule {}
