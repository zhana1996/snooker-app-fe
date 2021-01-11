import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';
import * as fromAction from '../actions/folder.actions';
import { ITraining } from "../models/trainings";
import * as fromReducer from '../reducers/folder.reducers';
import { FolderState } from "../reducers/folder.reducers";

@Injectable({ providedIn: 'root' })
export class FolderFacade {
    players$ = this.store.pipe(select(fromReducer.getPlayers));
    trainings$ = this.store.pipe(select(fromReducer.getTrainings));
    trainers$ = this.store.pipe(select(fromReducer.getTrainers));
    tournament$ = this.store.pipe(select(fromReducer.getEaliestTournament));
    allNews$ = this.store.pipe(select(fromReducer.getAllNews));
    users$ = this.store.pipe(select(fromReducer.getAllUsersByTitles));

    constructor(private store: Store<FolderState>) {}

    getAllPlayers(gender?: string): void {
        this.store.dispatch(fromAction.getAllPlayers({gender}));
    }

    createTraining(userId: string, training: ITraining): void {
        this.store.dispatch(fromAction.createTraining({userId, training}));
    }

    getTrainings(userId: string): void {
        this.store.dispatch(fromAction.getTrainings({userId}));
    }

    getTrainers(): void {
        this.store.dispatch(fromAction.getTrainers());
    }

    resetTrainings(): void {
        this.store.dispatch(fromAction.getTrainingsSuccess(null));
    }

    applyTraining(participats_ids: Object): void {
        this.store.dispatch(fromAction.applyTraining({participats_ids}));
    }

    getEarliestTournament(): void {
        this.store.dispatch(fromAction.getEarliestTournament());
    }

    addPlayerToTournament(tournamentParticipant: object): void {
        this.store.dispatch(fromAction.addPlayerToTournament({tournamentParticipant}));
    }

    deletePlayerFromTournamet(tournamentId: string): void {
        this.store.dispatch(fromAction.deletePlayerFromTournament({tournamentId}));
    }

    getAllNews(): void {
        this.store.dispatch(fromAction.getAllNews());
    }

    getAllUsersByTitles(): void {
        this.store.dispatch(fromAction.getAllUsersByTitles());
    }
}