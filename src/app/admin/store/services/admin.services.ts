import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { ITournamentsParams } from '../models/tournamentsParams';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) {}

    getAllPlayers(gender?: string): Observable<IUser[]>{
        const params = new HttpParams()
        .set('gender', gender);
        return this.http.get<IUser[]>(`${environment.API_URL}user/all`, {params});
    }

    updatePlayer(userDetails: IUserDetails): Observable<IUser>{
        return this.http.put<IUser>(`${environment.API_URL}user/user-details`, userDetails);
    }

    deletePlayer(userId: string): Observable<IUser>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.delete<IUser>(`${environment.API_URL}user`, {params});
    }

    getDisabledUsers(role?: string): Observable<IUser[]>{
        const params = new HttpParams()
        .set('role', role);
        return this.http.get<IUser[]>(`${environment.API_URL}user/disabled`, {params});
    }

    approveUser(userId?: string): Observable<IUser>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.get<IUser>(`${environment.API_URL}user/approve`, {params});
    }

    // Tournament

    createTournament(tournament: ITournament): Observable<ITournament> {
        return this.http.post<ITournament>(`${environment.API_URL_TOURNAMENT}`, tournament);
    }

    getTournaments(tournamentsParams: ITournamentsParams): Observable<ITournament[]> {
        let httpParams = new HttpParams();
        Object.keys(tournamentsParams).forEach((key) => {
          if (tournamentsParams[key] === null || tournamentsParams[key] === undefined) {
            return;
          }
          httpParams = httpParams.append(key, tournamentsParams[key]);
        });
        return this.http.get<ITournament[]>(`${environment.API_URL_TOURNAMENT}`, {params: httpParams});
    }

    updateTournament(tournament: ITournament): Observable<ITournament> {
        return this.http.put<ITournament>(`${environment.API_URL_TOURNAMENT}`, tournament);
    }

    deleteTournament(tournamentId: string): Observable<ITournament> {
        const params = new HttpParams()
        .set('tournamentId', tournamentId);
        return this.http.delete<ITournament>(`${environment.API_URL_TOURNAMENT}`, {params});
    }
}   