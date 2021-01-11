import { createAction, props } from '@ngrx/store';
import { INews } from 'src/app/folder/store/models/news';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { ITournamentsParams } from '../models/tournamentsParams';

//Players
export const getAllPlayers = createAction('[Admin Page] Get All Players', props<{gender?: string}>());
export const getAllPlayersSuccess = createAction('[Admin Page] Get All Players Success', props<{ players: IUser[] }>());
export const getAllPlayersError = createAction('[Admin Page] Get All Players Error', (error: Error) => error);

export const updatePlayer = createAction('[Admin Page] Update Player', props<{userDetails: IUserDetails}>());
export const updatePlayerSuccess = createAction('[Admin Page] Update Player Success', props<{ player: IUserDetails }>());
export const updatePlayerError = createAction('[Admin Page] Update Player Error', (error: Error) => error);

export const deletePlayer = createAction('[Admin Page] Delete Player', props<{userId: string}>());
export const deletePlayerSuccess = createAction('[Admin Page] Delete Player Success', props<{ user: IUser }>());
export const deletePlayerError = createAction('[Admin Page] Delete Player Error', (error: Error) => error);

export const getDisabledUsers = createAction('[Admin Page] Get Disabled Users', props<{role: string}>());
export const getDissabledUsersSuccess = createAction('[Admin Page] Get Disabled Users Success', props<{ users: IUser[] }>());
export const getDissabledUsersError = createAction('[Admin Page] Get Disabled Users Error', (error: Error) => error);

export const approveUser = createAction('[Admin Page] Approve User', props<{userId: string}>());
export const approveUserSuccess = createAction('[Admin Page] Approve User Success', props<{ user: IUser }>());
export const approveUserError = createAction('[Admin Page] Approve User Error', (error: Error) => error);

// Tournaments
export const createTournament = createAction('[Admin Page] Create Tournament', props<{tournament: ITournament}>());
export const createTournamentSuccess = createAction('[Admin Page] Create Tournament Success', props<{ tournament: ITournament }>());
export const createTournamentError = createAction('[Admin Page] Create Tournament Error', (error: Error) => error);

export const editTournament = createAction('[Admin Page] Edit Tournament', props<{tournament: ITournament}>());
export const editTournamentSuccess = createAction('[Admin Page] Edit Tournament Success', props<{ tournament: ITournament }>());
export const editTournamentError = createAction('[Admin Page] Edit Tournament Error', (error: Error) => error);

export const deleteTournament = createAction('[Admin Page] Delete Tournament', props<{tournamentId: string}>());
export const deleteTournamentSuccess = createAction('[Admin Page] Delete Tournament Success', props<{ deleteTournament: ITournament }>());
export const deleteTournamentError = createAction('[Admin Page] Delete Tournament Error', (error: Error) => error);

export const getTournaments = createAction('[Admin Page] Get Tournaments', props<{tournamentParams: ITournamentsParams}>());
export const getTournamentsSuccess = createAction('[Admin Page] Get Tournaments Success', props<{ tournaments: ITournament[] }>());
export const getTournamentsError = createAction('[Admin Page] Get Tournaments Error', (error: Error) => error);


//News
export const createNews = createAction('[Folder Page] Create News', props<{news: Object}>());
export const createNewsSuccess = createAction('[Folder Page] Create News Success', props<{ createNews: Object }>());
export const createNewsError = createAction('[Folder Page] Create News Error', (error: Error) => error);

export const getAllNews = createAction('[Folder Page] Get All News');
export const getAllNewsSuccess = createAction('[Folder Page] Get All News Success', props<{ news: INews[] }>());
export const getAllNewsError = createAction('[Folder Page] Get All News Error', (error: Error) => error);

export const deleteNews = createAction('[Folder Page] Delete News', props<{newsId: string}>());
export const deleteNewsSuccess = createAction('[Folder Page] Delete News Success', props<{ deleteNews: Object }>());
export const deleteNewsError = createAction('[Folder Page] Delete News Error', (error: Error) => error);

export const updateNews = createAction('[Folder Page] Update News', props<{news: INews}>());
export const updateNewsSuccess = createAction('[Folder Page] Update News Success', props<{ updateNews: INews }>());
export const updateNewsError = createAction('[Folder Page] Update News Error', (error: Error) => error);