import { IUser } from "src/app/folder/store/models/players";

export interface ITournamentsParams {
    month?: number;
    year?: number;
    season?: string;
}

export interface ITournamentParticipants {
    numberOnePlayer: IUser;
    players: []
}