import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'tournament-games-results',
  templateUrl: 'tournament-games-results.component.html',
  styleUrls: ['tournament-games-results.component.scss']
})
export class TournamentGamesResultsComponent {
    constructor(public modalController: ModalController) {}
}
