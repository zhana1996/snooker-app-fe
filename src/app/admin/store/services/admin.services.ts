import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';
import { ITournament } from 'src/app/folder/store/models/tournament';
import { ITournamentParticipants, ITournamentsParams } from '../models/tournamentsParams';
import { INews } from 'src/app/folder/store/models/news';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) {}

    getAllPlayers(gender?: string): Observable<IUser[]>{
        const params = new HttpParams()
        .set('gender', gender);
        return this.http.get<IUser[]>(`${environment.API_URL_USER}/all`, {params});
    }

    updatePlayer(userDetails: IUserDetails): Observable<IUser>{
        return this.http.put<IUser>(`${environment.API_URL_USER}/user-details`, userDetails);
    }

    deletePlayer(userId: string): Observable<IUser>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.delete<IUser>(`${environment.API_URL_USER}`, {params});
    }

    getDisabledUsers(role?: string): Observable<IUser[]>{
        const params = new HttpParams()
        .set('role', role);
        return this.http.get<IUser[]>(`${environment.API_URL_USER}/disabled`, {params});
    }

    approveUser(userId?: string): Observable<IUser>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.get<IUser>(`${environment.API_URL_USER}/approve`, {params});
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

    getTournamentById(id: string): Observable<ITournament> {
        return this.http.get<ITournament>(`${environment.API_URL_TOURNAMENT}/${id}`);
    }

    shuffleUsers(id: string): Observable<ITournamentParticipants> {
        return this.http.get<ITournamentParticipants>(`${environment.API_URL_TOURNAMENT}/shuffle/${id}`);
    }

    createNews(news: Object): Observable<Object> {
        return this.http.post<Object>(`${environment.API_URL_NEWS}`, news);
    }

    getAllNews(): Observable<INews[]> {
        return this.http.get<INews[]>(`${environment.API_URL_NEWS}`);
    }

    deleteNews(newsId: string): Observable<Object> {
        const params = new HttpParams()
        .set('newsId', newsId);
        return this.http.delete<Object>(`${environment.API_URL_NEWS}`, {params});
    }

    updateNews(news: INews): Observable<INews> {
        return this.http.put<INews>(`${environment.API_URL_NEWS}`, news);
    }

    downloadFile(name: string) {
        return this.http.get(`${environment.API_URL}/file-storage/${name}`, {
            responseType: 'blob',
            reportProgress: true,
            observe: 'events'
        });
    }
}   