import { Action, createReducer, on, createFeatureSelector } from '@ngrx/store';
import { IUser } from 'src/app/folder/store/models/players';
import * as fromActions from '../actions/user.actions';

export interface UserState {
    user: IUser,
    logIn: Object
}

export const initialState: UserState = {
    user: null,
    logIn: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.createUser, state => ({
        ...state
    })),
    on (fromActions.createUserSuccess, (state, {user} )=> ({
        ...state,
        user
    })),
    on (fromActions.logInUser, state => ({
        ...state
    })),
    on (fromActions.logInUserSuccess, (state, {logIn} )=> ({
        ...state,
        logIn
    }))
);

export interface State {
    user: UserState
}

export const getUserState = createFeatureSelector<UserState>('user');

export function userReducer (state: UserState | undefined, action: Action) {
    return featureReducer(state, action);
}