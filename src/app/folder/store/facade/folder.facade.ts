import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';
import * as fromAction from '../actions/folder.actions';
import * as fromReducer from '../reducers/folder.reducers';
import { FolderState } from "../reducers/folder.reducers";

@Injectable({ providedIn: 'root' })
export class FolderFacade {
    players$ = this.store.pipe(select(fromReducer.getPlayers));
    constructor(private store: Store<FolderState>) {}

    getAllPlayers(gender?: string): void {
        this.store.dispatch(fromAction.getAllPlayers({gender}));
    }
}