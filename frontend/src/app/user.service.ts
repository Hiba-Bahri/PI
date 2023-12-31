import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl= 'http://localhost:8080';


  constructor(private http: HttpClient) {}


  getAllClient(){
    return this.http.get(`${this.baseUrl}/getAllClients`)
  }

  createClient(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/createClient`, data);
  }

}
