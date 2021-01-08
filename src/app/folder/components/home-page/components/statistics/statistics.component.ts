import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from 'src/app/folder/store/facade/folder.facade';
import { IUser } from 'src/app/folder/store/models/players';

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {
  private players$: Observable<IUser[]>;
  private playersSubs: Subscription;
  public players: IUser[] = [];
  constructor(private facade: FolderFacade,
              private toaster: ToasterService) {
    this.players$ = this.facade.players$;
  }
  ngOnInit() {
    this.facade.getAllPlayers('');
    this.playersSubs = this.players$.subscribe((data: IUser[]) => {
      if(data) {
        if(data.length > 0) {
          this.players = data;
        } else {
          this.players = [];
          this.toaster.showToaster('Няма регистрирани играчи', 'danger');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.playersSubs.unsubscribe();
  }
}
