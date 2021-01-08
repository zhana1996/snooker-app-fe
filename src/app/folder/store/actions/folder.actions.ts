import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/players';

export const getAllPlayers = createAction('[Folder Page] Get All Players', props<{gender?: string}>());
export const getAllPlayersSuccess = createAction('[Folder Page] Get All Players Success', props<{ players: IUser[] }>());
export const getAllPlayersError = createAction('[Folder Page] Get All Players Error', (error: Error) => error);