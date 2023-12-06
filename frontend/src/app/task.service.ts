import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl= 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  
  getAllTasks(){
    return this.http.get(`${this.baseUrl}/getAllTasks`);
  }
    
  createTask(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/createTask`,data);
  }
  
  updateTask(id:any, editedTask:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/updateTask/${id}`,editedTask);
  }

  deleteTask(id:any){
    return this.http.delete(`${this.baseUrl}/deleteTask/${id}`, { responseType: 'text' })
  }

}