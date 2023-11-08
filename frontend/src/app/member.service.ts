import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllMembers(){
    return this.http.get(`${this.baseUrl}/getAllMembers`);
  }

  getMemberById(memberId: number) {          
    return this.http.get(`${this.baseUrl}/member/${memberId}`);
  }

  addMemberToTeam(teamId: number, memberId: number){
    return this.http.post(`${this.baseUrl}/addMember/${memberId}/In/${teamId}`, {});
  }

  removeMemberFromTeam(teamId: number, memberId: number) {
    return this.http.delete(`${this.baseUrl}/removeMember/${memberId}/from/${teamId}`);
  }
}
