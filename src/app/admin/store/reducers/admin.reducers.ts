import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import * as fromActions from '../actions/admin.actions';

export interface AdminState {
    players: IUser[];
    player: IUserDetails;
}

export const initialState: AdminState = {
    players: null,
    player: null
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
    on (fromActions.updatePlayer, state => ({
        ...state
    })),
    on (fromActions.updatePlayerSuccess, (state, {player} )=> ({
        ...state,
        player
    }))
);

export interface State {
    admin: AdminState
}

export const getAdminState = createFeatureSelector<AdminState>('admin');
export const getPlayers = createSelector(getAdminState,(state: AdminState) => state.players);
export const getUpdatePlayer = createSelector(getAdminState,(state: AdminState) => state.player);

export function adminReducer (state: AdminState | undefined, action: Action) {
    return featureReducer(state, action);
}