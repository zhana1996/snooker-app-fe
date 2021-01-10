import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { IUserDetails } from "src/app/folder/store/models/players";
import { ITournament } from "src/app/folder/store/models/tournament";
import * as fromAction from '../actions/admin.actions';
import { ITournamentsParams } from "../models/tournamentsParams";
import * as fromReducer from '../reducers/admin.reducers';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
    players$ = this.store.pipe(select(fromReducer.getPlayers));
    player$ = this.store.pipe(select(fromReducer.getUpdatePlayer));
    disabledUsers$ = this.store.pipe(select(fromReducer.disabledUsers));
    tournaments$ = this.store.pipe(select(fromReducer.getTournaments));
    deleteTournament$ = this.store.pipe(select(fromReducer.deleteTournament));

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

    getDisabledUsers(role: string): void {
        this.store.dispatch(fromAction.getDisabledUsers({role}));
    }

    approveUser(userId: string): void {
        this.store.dispatch(fromAction.approveUser({userId}));
    }

    // Tournament

    createTournament(tournament: ITournament): void {
        this.store.dispatch(fromAction.createTournament({tournament}));
    }

    getTournaments(tournamentParams: ITournamentsParams): void {
        this.store.dispatch(fromAction.getTournaments({tournamentParams}));
    }

    editTournament(tournament: ITournament): void {
        this.store.dispatch(fromAction.editTournament({tournament}));
    }

    deleteTournament(tournamentId: string): void {
        this.store.dispatch(fromAction.deleteTournament({tournamentId}));
    }
}