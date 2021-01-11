import { createAction, props } from '@ngrx/store';
import { INews } from '../models/news';
import { IUser } from '../models/players';
import { IEarliestTournament } from '../models/tournament';
import { ITraining } from '../models/trainings';

export const getAllPlayers = createAction('[Folder Page] Get All Players', props<{gender?: string}>());
export const getAllPlayersSuccess = createAction('[Folder Page] Get All Players Success', props<{ players: IUser[] }>());
export const getAllPlayersError = createAction('[Folder Page] Get All Players Error', (error: Error) => error);

export const createTraining = createAction('[Folder Page] Create Training', props<{userId?: string, training: ITraining}>());
export const CreateTrainingSuccess = createAction('[Folder Page] Create Training Success', props<{ training: Object }>());
export const CreateTrainingError = createAction('[Folder Page] Create Training Error', (error: Error) => error);

export const getTrainings = createAction('[Folder Page] Get Trainings', props<{userId?: string}>());
export const getTrainingsSuccess = createAction('[Folder Page] Get Trainings Success', props<{ trainings: ITraining[] }>());
export const getTrainingsError = createAction('[Folder Page] Get Trainings Error', (error: Error) => error);

export const getTrainers = createAction('[Folder Page] Get All Trainers');
export const getTrainersSuccess = createAction('[Folder Page] Get All Trainers Success', props<{ trainers: IUser[] }>());
export const getTrainersError = createAction('[Folder Page] Get All Trainers Error', (error: Error) => error);

export const applyTraining = createAction('[Folder Page] Apply Training', props<{ participats_ids: Object }>());
export const applyTrainingSuccess = createAction('[Folder Page] Apply Training Success', props<{ training: Object }>());
export const applyTrainingError = createAction('[Folder Page] Apply Training Error', (error: Error) => error);

export const getEarliestTournament = createAction('[Folder Page] Get Earliest Tournament');
export const getEarliestTournamentSuccess = createAction('[Folder Page] Get Earliest Tournament Success', props<{ tournament: IEarliestTournament }>());
export const getEarliestTournamentError = createAction('[Folder Page] Get Earliest Tournament Error', (error: Error) => error);

export const addPlayerToTournament = createAction('[Folder Page] Add Player To Tournament', props<{tournamentParticipant: Object}>());
export const addPlayerToTournamentSuccess = createAction('[Folder Page] Add Player To Tournament Success', props<{ addResponse: Object }>());
export const addPlayerToTournamentError = createAction('[Folder Page] Add Player To Tournament Error', (error: Error) => error);

export const deletePlayerFromTournament = createAction('[Folder Page] Delete Player From Tournament', props<{tournamentId: string}>());
export const deletePlayerFromTournamentSuccess = createAction('[Folder Page] Delete Player From Tournament Success', props<{ deleteResponse: Object }>());
export const deletePlayerFromTurnamentError = createAction('[Folder Page] Delete Player From Tournament Error', (error: Error) => error);

export const getAllNews = createAction('[Folder Page] Get All News');
export const getAllNewsSuccess = createAction('[Folder Page] Get All News Success', props<{ news: INews[] }>());
export const getAllNewsError = createAction('[Folder Page] Get All News Error', (error: Error) => error);
