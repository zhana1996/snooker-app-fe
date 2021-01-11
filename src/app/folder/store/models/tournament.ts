export interface ITournament {
    id?: string,
    name: string,
    place: string,
    startDate: Date,
    season: string
    tournamentParticipants?: Object[]
}

export interface IEarliestTournament {
    days: number,
    hours: number,
    minutes: number,
    tournament: ITournament
}