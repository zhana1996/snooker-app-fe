import { createAction, props } from '@ngrx/store';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';

export const getAllPlayers = createAction('[Admin Page] Get All Players', props<{gender?: string}>());
export const getAllPlayersSuccess = createAction('[Admin Page] Get All Players Success', props<{ players: IUser[] }>());
export const getAllPlayersError = createAction('[Admin Page] Get All Players Error', (error: Error) => error);

export const updatePlayer = createAction('[Admin Page] Update Player', props<{userDetails: IUserDetails}>());
export const updatePlayerSuccess = createAction('[Admin Page] Update Player Success', props<{ player: IUserDetails }>());
export const updatePlayerError = createAction('[Admin Page] Update Player Error', (error: Error) => error);

export const deletePlayer = createAction('[Admin Page] Delete Player', props<{userId: string}>());
export const deletePlayerSuccess = createAction('[Admin Page] Delete Player Success', props<{ user: IUser }>());
export const deletePlayerError = createAction('[Admin Page] Delete Player Error', (error: Error) => error);