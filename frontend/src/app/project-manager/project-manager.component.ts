import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit{
  projects: any[] = [];
  constructor(private projectService: ProjectService, private router:Router, private http:HttpClient){}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((result)=>{
      this.projects=result as any;
    })    
  }
  redirectToDetails(projectId: number) {
    this.router.navigate(['/Project', projectId]);
  }
}
