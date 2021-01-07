import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    createNewUser(user: Object): Observable<Object>{
        return this.http.post<Object>(`${environment.API_URL}user/register`, user);
    }

    logIn(user: Object): Observable<Object>{
        return this.http.post<Object>(`${environment.API_URL}auth/login`, user);
    }

    getUser(){
        const token = localStorage.getItem('accessToken')
        return jwt_decode.default(token);
    }
}   