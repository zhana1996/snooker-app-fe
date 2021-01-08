import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { IUser } from "src/app/folder/store/models/players";
import * as fromAction from '../actions/user.actions';
import { UserState } from "../reducers/user.reducers";

@Injectable({ providedIn: 'root' })
export class UserFacade {
    
    constructor(private store: Store<UserState>) {}

    createNewUser(user: IUser) {
        this.store.dispatch(fromAction.createUser({user}));
    }

    logInUser(user: Object) {
        this.store.dispatch(fromAction.logInUser({user}));
    }
}