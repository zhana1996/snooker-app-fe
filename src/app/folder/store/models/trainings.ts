import { IUser } from "./players";

export interface ITraining {
    id?: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    user?: IUser,
    participant?: IParticipant,
}

export interface IParticipant {
    id: string,
    player: IUser
}