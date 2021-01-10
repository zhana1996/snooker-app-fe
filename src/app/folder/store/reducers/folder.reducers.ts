import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/folder.actions';
import { IUser } from '../models/players';
import { IEarliestTournament } from '../models/tournament';
import { ITraining } from '../models/trainings';

export interface FolderState {
    players: IUser[],
    trainings: ITraining[],
    trainers: IUser[],
    tournament: IEarliestTournament
}

export const initialState: FolderState = {
    players: null,
    trainings: null,
    trainers: null,
    tournament: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.getAllPlayers, state => ({
        ...state
    })),
    on (fromActions.getAllPlayersSuccess, (state, {players} )=> ({
        ...state,
        players
    })),
    on (fromActions.getTrainings, state => ({
        ...state
    })),
    on (fromActions.getTrainingsSuccess, (state, {trainings} )=> ({
        ...state,
        trainings
    })),
    on (fromActions.getTrainers, state => ({
        ...state
    })),
    on (fromActions.getTrainersSuccess, (state, {trainers} )=> ({
        ...state,
        trainers
    })),
    on (fromActions.getEarliestTournament, state => ({
        ...state
    })),
    on (fromActions.getEarliestTournamentSuccess, (state, {tournament} )=> ({
        ...state,
        tournament
    }))
);

export interface State {
    folder: FolderState
}

export const getFolderState = createFeatureSelector<FolderState>('folder');
export const getPlayers = createSelector(getFolderState,(state: FolderState) => state.players);
export const getTrainings = createSelector(getFolderState,(state: FolderState) => state.trainings);
export const getTrainers = createSelector(getFolderState,(state: FolderState) => state.trainers);
export const getEaliestTournament = createSelector(getFolderState,(state: FolderState) => state.tournament);

export function folderReducer (state: FolderState | undefined, action: Action) {
    return featureReducer(state, action);
}