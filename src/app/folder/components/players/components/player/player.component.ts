import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Object;
  
  constructor(public router: Router,
              public modalController: ModalController) {}
  ngOnInit() {}
}
