import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';
import * as fromActions from '../actions/admin.actions';

export interface AdminState {
    players: IUser[];
    player: IUserDetails;
    users: IUser[];
    tournaments: ITournament[],
    deleteTournament: ITournament
}

export const initialState: AdminState = {
    players: null,
    player: null,
    users: null,
    tournaments: null,
    deleteTournament: null
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
    })),
    on (fromActions.getDisabledUsers, state => ({
        ...state
    })),
    on (fromActions.getDissabledUsersSuccess, (state, {users} )=> ({
        ...state,
        users
    })),
    on (fromActions.getTournaments, state => ({
        ...state
    })),
    on (fromActions.getTournamentsSuccess, (state, {tournaments} )=> ({
        ...state,
        tournaments
    })),
    on (fromActions.deleteTournament, state => ({
        ...state
    })),
    on (fromActions.deleteTournamentSuccess, (state, {deleteTournament} )=> ({
        ...state,
        deleteTournament
    }))
);

export interface State {
    admin: AdminState
}

export const getAdminState = createFeatureSelector<AdminState>('admin');
export const getPlayers = createSelector(getAdminState,(state: AdminState) => state.players);
export const getUpdatePlayer = createSelector(getAdminState,(state: AdminState) => state.player);
export const disabledUsers = createSelector(getAdminState,(state: AdminState) => state.users);
export const getTournaments = createSelector(getAdminState,(state: AdminState) => state.tournaments);
export const deleteTournament = createSelector(getAdminState,(state: AdminState) => state.deleteTournament);

export function adminReducer (state: AdminState | undefined, action: Action) {
    return featureReducer(state, action);
}