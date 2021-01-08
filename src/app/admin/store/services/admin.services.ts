import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, IUserDetails } from 'src/app/folder/store/models/players';

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
}   