// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Import the User model

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'http://localhost:8080/login';

    constructor(private http: HttpClient) {}

    login(user: any): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }
}
