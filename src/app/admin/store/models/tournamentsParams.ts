import { IUser } from "src/app/folder/store/models/players";

export interface ITournamentsParams {
    month?: number;
    year?: number;
    season?: string;
}

export interface ITournamentParticipants {
    numberOnePlayer: IUser;
    players: IPlayers[];
}

export interface IPlayers {
    players: IUser[];
}