import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllTeams(){
    return this.http.get(`${this.baseUrl}/getAllTeams`);
  }
  getTeamById(id: number){
    return this.http.get(`${this.baseUrl}/getTeamById/${id}`);
  }

  createTeam(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createTeam`, data);
  }

  deleteTeam(id: number){
    return this.http.delete(`${this.baseUrl}/deleteTeam/${id}`, { responseType: 'text' });
  }
}
