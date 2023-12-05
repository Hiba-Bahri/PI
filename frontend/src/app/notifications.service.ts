import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private baseUrl= 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllNotifs(){
    return this.http.get(`${this.baseUrl}/getAllNotifs`);
  }
  saveNotif(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/saveNotif`,data);
  }

  getNotifbyId(userId:any){
    return this.http.get<any>(`${this.baseUrl}/getNotifById/${userId}`);
  }
}
