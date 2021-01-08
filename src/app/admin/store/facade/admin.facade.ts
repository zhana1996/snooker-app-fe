import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { IUserDetails } from "src/app/folder/store/models/players";
import * as fromAction from '../actions/admin.actions';
import * as fromReducer from '../reducers/admin.reducers';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
    players$ = this.store.pipe(select(fromReducer.getPlayers));
    player$ = this.store.pipe(select(fromReducer.getUpdatePlayer));
    constructor(private store: Store<fromReducer.AdminState>) {}

    getAllPlayers(gender?: string): void {
        this.store.dispatch(fromAction.getAllPlayers({gender}));
    }

    updatePlayer(userDetails: IUserDetails): void {
        this.store.dispatch(fromAction.updatePlayer({userDetails}));
    }

    resetResponse(): void {
        this.store.dispatch(fromAction.updatePlayerSuccess(null));
    }

    deletePlayer(userId: string): void {
        this.store.dispatch(fromAction.deletePlayer({userId}));
    }
}