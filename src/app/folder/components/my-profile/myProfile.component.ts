import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FolderFacade } from '../../store/facade/folder.facade';
import { IUser } from '../../store/models/players';

@Component({
  selector: 'news',
  templateUrl: 'myProfile.component.html',
  styleUrls: ['myProfile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  readonly env = environment;
  id: string;
  showResults = false;
  user: IUser;

  private user$: Observable<IUser>;
  private userSubs: Subscription;

  constructor(private facade: FolderFacade) {
      this.user$ = this.facade.user$;
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.facade.getUserById(this.id);

    this.userSubs = this.user$.subscribe((data: IUser) =>{
        if (data) {
            this.user = data;
            this.showResults = true;
        } else {
            this.showResults = false;
        }
    });
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }
}
