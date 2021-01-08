import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';

@Component({
  selector: 'edit-player',
  templateUrl: 'edit-player.component.html',
  styleUrls: ['edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit, OnDestroy {
    private _player: IUser;
    public playerForm: FormGroup;

    private updatePlayer$: Observable<IUserDetails>;
    private updatePlayerSubs: Subscription;

    @Input()
    get player(): IUser {
      return this._player;
    }
    set player(value: IUser) {
      if (value) {
        this.playerForm.patchValue(value.userDetails);
        this._player = value;
      }
    }
    constructor(private formBuilder: FormBuilder,
                private toaster: ToasterService,
                public popoverController: PopoverController,
                private facade: AdminFacade) {
      this.updatePlayer$ = this.facade.player$;
      this.initForm();
    }
    ngOnInit() {
      this.updatePlayerSubs = this.updatePlayer$.subscribe((data: IUserDetails) => {
        if(data) {
          this.toaster.showToaster('Успешна промяна', 'success')
          setTimeout(() => {
            this.popoverController.dismiss();
            this.facade.getAllPlayers('');
          }, 1500);
          this.facade.resetResponse();
        }
      });
    }

    public initForm(): void {
      this.playerForm = this.formBuilder.group({
        break: [''],
        rank: [''],
        wins: [''],
        losts: [''],
        matches: [''],
        titles: [''],
        points: [''],
        club: [''],
        age: ['']
      });
    }

    editPlayer(): void {
      let editPlayer = this.playerForm.value;
      editPlayer.id = this.player.userDetails.id;
      editPlayer.image = this.player.userDetails.image;
      editPlayer.startDate = this.player.userDetails.startDate;
      editPlayer.name = this.player.userDetails.name;
      editPlayer.gender = this.player.userDetails.gender;
      this.facade.updatePlayer(editPlayer);
    }

    ngOnDestroy(): void {
      this.updatePlayerSubs.unsubscribe();
    }
}
