import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createMember(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createMember`, data);
  }

  getAllMembers(){
    return this.http.get(`${this.baseUrl}/getAllMembers`);
  }

  getMemberById(memberId: number) {          
    return this.http.get(`${this.baseUrl}/getMemberById/${memberId}`);
  }

  addMemberToTeam(teamId: number, memberId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/addMember/${memberId}/In/${teamId}`, {},{ responseType: 'text' });
  }

  removeMemberFromTeam(teamId: number, memberId: number): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/removeMember/${memberId}/from/${teamId}`, { responseType: 'text' });
  }
  
}
