import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl= 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllProjects(){
    return this.http.get(`${this.baseUrl}/getAllProjects`);
  }
  createProject(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/createProject`,data);
  }

  getProjectbyId(projectId:any){
    return this.http.get<any>(`${this.baseUrl}/getProjectById/${projectId}`);
  }

  updateProject(id:any, editedProject:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/updateProject/${id}`,editedProject);
  }
  deleteProject(id:number){
    return this.http.delete(`${this.baseUrl}/deleteProject/${id}`)
  }

  updateProjectTeam(id:any,team:any){
    return this.http.put(`${this.baseUrl}/updateProjectTeam/${id}`,team)
  }
  
}
