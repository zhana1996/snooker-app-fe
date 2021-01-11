import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/players';
import { ITraining } from '../models/trainings';
import { IEarliestTournament } from '../models/tournament';
import { INews } from '../models/news';

@Injectable({
    providedIn: 'root'
})
export class FolderService {
    constructor(private http: HttpClient) {}

    getAllPlayers(gender?: string): Observable<IUser[]>{
        const params = new HttpParams()
        .set('gender', gender);
        return this.http.get<IUser[]>(`${environment.API_URL}user/all`, {params});
    }

    createTraining(userId: string, training: ITraining): Observable<Object>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.post<Object>(`${environment.API_URL}training`, training, {params});
    }

    getTrainings(userId: string): Observable<ITraining[]>{
        const params = new HttpParams()
        .set('userId', userId);
        return this.http.get<ITraining[]>(`${environment.API_URL}training`, {params});
    }

    getTrainers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${environment.API_URL}user/trainers`);
    }

    applyTraining(participats_ids: Object): Observable<Object> {
        return this.http.post<Object>(`${environment.API_URL}training-participant`, participats_ids);
    }
    
    getEarliestTournament(): Observable<IEarliestTournament> {
        return this.http.get<IEarliestTournament>(`${environment.API_URL_TOURNAMENT}/earliest`);
    }

    addPlayerToTournament(tournamentParticipant: Object): Observable<Object> {
        return this.http.post<Object>(`${environment.API_URL_TOURNAMENT_PARTICIPANT}`, {tournamentParticipant});
    }

    deletePlayerFromTournament(tournamentId: string): Observable<Object> {
        const params = new HttpParams()
        .set('tournamentId', tournamentId);
        return this.http.delete<Object>(`${environment.API_URL_TOURNAMENT_PARTICIPANT}`, {params});
    }

    getAllNews(): Observable<INews[]> {
        return this.http.get<INews[]>(`${environment.API_URL_NEWS}`);
    }
}   