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
  project :any={};
  manager='';
  constructor(private projectService: ProjectService, private router:Router, private http:HttpClient){}

  ngOnInit(): void {
    this.manager= localStorage.getItem("user") ?? '';
    this.projectService.getProjectByManager(this.manager).subscribe((result)=>{
      this.project=result as any;
    })    
  }
  redirectToDetails(projectId: number) {
    this.router.navigate(['/Project', projectId]);
  }
}
