export interface IUser {
    email: string;
    id?: string;
    role: string;
    userDetails: IUserDetails;
    username: string;
    password?: string;
}

export interface IUserDetails {
    age?: number;
    break?: number;
    club?: string;
    gender?: string
    id?: string;
    image?: string;
    losts?: number;
    matches?: number;
    name?: string;
    points?: number;
    rank?: number;
    startDate?: string;
    titles?: number;
    wins?: number;
}
