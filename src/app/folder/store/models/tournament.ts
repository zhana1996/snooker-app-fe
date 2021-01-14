export interface ITournament {
    id?: string,
    name: string,
    place: string,
    startDate: Date,
    isEarliest?: boolean,
    season: string
    fileName: string;
    tournamentParticipants?: Object[]
}

export interface IEarliestTournament {
    days: number,
    hours: number,
    minutes: number,
    tournament: ITournament
}