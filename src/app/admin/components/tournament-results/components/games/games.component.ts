import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'games',
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss']
})
export class GamesComponent implements OnInit {
    constructor(public modalController: ModalController) {}
    ngOnInit(): void{}
}
