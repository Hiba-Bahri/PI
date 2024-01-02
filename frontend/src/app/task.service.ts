import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTasks`);
  }

  getAllTasksByProjectId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTasksByProjectId/${id}`);
  }

  getAllTasksByMemberId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTasksByMemberId/${id}`);
  }

  createTask(data: any): Observable<any> {
    console.log(data.project);
    return this.http.post(`${this.baseUrl}/createTask`, data);
  }

  updateTask(id: any, editedTask: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateTask/${id}`, editedTask);
  }

  updateTaskStatus(status: string, taskId: any): Observable<any> {
    console.log(status, taskId);
    return this.http.put(`${this.baseUrl}/updateTask/${taskId}/Status`, status);
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteTask/${id}`, { responseType: 'text' });
  }
}
