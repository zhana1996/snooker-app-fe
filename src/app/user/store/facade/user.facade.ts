import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { IUser } from "src/app/folder/store/models/players";
import * as fromAction from '../actions/user.actions';
import { UserState } from "../reducers/user.reducers";
import { getImage } from '../reducers/user.reducers';

@Injectable({ providedIn: 'root' })
export class UserFacade {
    public response$: Observable<any> = this.store.pipe(select(getImage));
    
    constructor(private store: Store<UserState>) {}

    createNewUser(user: IUser) {
        this.store.dispatch(fromAction.createUser({user}));
    }

    logInUser(user: Object) {
        this.store.dispatch(fromAction.logInUser({user}));
    }

    uploadImage(imageBlob: Blob, imageName: string): void {
        this.store.dispatch(
          fromAction.uploadImage({ imageBlob, imageName })
        );
    }
}