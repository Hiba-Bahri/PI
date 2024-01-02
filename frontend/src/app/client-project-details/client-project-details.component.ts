import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-project-details',
  templateUrl: './client-project-details.component.html',
  styleUrls: ['./client-project-details.component.css']
})
export class ClientProjectDetailsComponent implements OnInit{
  http:HttpClient;
  projectId:any;
  project:any ={}
  tasks:any[] = []
  constructor(http:HttpClient){
    this.http = http;
  }

  ngOnInit(): void {
      // get the project details by passing the project id to the server
      this.http.get(`http://localhost:8080/getProjectByOwner/${localStorage.getItem("userId")}`).subscribe((res)=>{
        this.project=res;
        this.http.get(`http://localhost:8080/getAllTasksByProjectId/${this.project.id}`).subscribe((result)=>{
            this.tasks=result as any;
        })
      })

  }

  calculateProgress(): number {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(task => task.progress === 'Finished').length;
    const progressPercentage = (completedTasks / totalTasks) * 100;
    return progressPercentage;
  }
}