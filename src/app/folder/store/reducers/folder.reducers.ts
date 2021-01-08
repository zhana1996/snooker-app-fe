import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/folder.actions';
import { IUser } from '../models/players';

export interface FolderState {
    players: IUser[]
}

export const initialState: FolderState = {
    players: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.getAllPlayers, state => ({
        ...state
    })),
    on (fromActions.getAllPlayersSuccess, (state, {players} )=> ({
        ...state,
        players
    }))
);

export interface State {
    folder: FolderState
}

export const getFolderState = createFeatureSelector<FolderState>('folder');
export const getPlayers = createSelector(getFolderState,(state: FolderState) => state.players);

export function folderReducer (state: FolderState | undefined, action: Action) {
    return featureReducer(state, action);
}