import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IUser } from 'src/app/folder/store/models/players';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {
  readonly env = environment;
  @Input() player: IUser;
  
  constructor(public router: Router,
              public modalController: ModalController) {}
  ngOnInit() {}
}
