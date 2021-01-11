import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/folder.actions';
import { INews } from '../models/news';
import { IUser } from '../models/players';
import { IEarliestTournament } from '../models/tournament';
import { ITraining } from '../models/trainings';

export interface FolderState {
    players: IUser[],
    trainings: ITraining[],
    trainers: IUser[],
    tournament: IEarliestTournament,
    news: INews[]
}

export const initialState: FolderState = {
    players: null,
    trainings: null,
    trainers: null,
    tournament: null,
    news: null
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
    })),
    on (fromActions.getAllNews, state => ({
        ...state
    })),
    on (fromActions.getAllNewsSuccess, (state, {news} )=> ({
        ...state,
        news
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
export const getAllNews = createSelector(getFolderState,(state: FolderState) => state.news);

export function folderReducer (state: FolderState | undefined, action: Action) {
    return featureReducer(state, action);
}