import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { INews } from 'src/app/folder/store/models/news';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';
import * as fromActions from '../actions/admin.actions';
import { ITournamentParticipants } from '../models/tournamentsParams';

export interface AdminState {
    players: IUser[];
    player: IUserDetails;
    users: IUser[];
    tournaments: ITournament[],
    deleteTournament: ITournament,
    news: INews[],
    shuffleUsers: ITournamentParticipants;
    tournamentById: ITournament;
    response: any;
}

export const initialState: AdminState = {
    players: null,
    player: null,
    users: null,
    tournaments: null,
    deleteTournament: null,
    news: null,
    shuffleUsers: null,
    tournamentById: null,
    response: null
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
    })),
    on (fromActions.getAllNews, state => ({
        ...state
    })),
    on (fromActions.getAllNewsSuccess, (state, {news} )=> ({
        ...state,
        news
    })),
    on (fromActions.shuffleUsers, state => ({
        ...state
    })),
    on (fromActions.shuffleUsersSuccess, (state, {shuffleUsers} )=> ({
        ...state,
        shuffleUsers
    })),
    on (fromActions.getTournamentById, state => ({
        ...state
    })),
    on (fromActions.getTournamentByIdSuccess, (state, {tournamentById} )=> ({
        ...state,
        tournamentById
    })),
    on (fromActions.uploadImage, state => ({
        ...state
    })),
    on (fromActions.uploadImageSuccess, (state, {response} )=> ({
        ...state,
        response
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
export const getAllNews = createSelector(getAdminState,(state: AdminState) => state.news);
export const getShuffleUsers = createSelector(getAdminState,(state: AdminState) => state.shuffleUsers);
export const getTournamentByID = createSelector(getAdminState,(state: AdminState) => state.tournamentById);
export const uploadImage = createSelector(getAdminState,(state: AdminState) => state.response);

export function adminReducer (state: AdminState | undefined, action: Action) {
    return featureReducer(state, action);
}