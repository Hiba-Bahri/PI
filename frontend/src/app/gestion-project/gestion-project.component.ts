import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gestion-project',
  templateUrl: './gestion-project.component.html',
  styleUrls: ['./gestion-project.component.css']
})
export class GestionProjectComponent implements OnInit{
  editedProject:any={};
  updatedProject:any={};
  updatedTeamProject:any={};
  createSectionVisible: boolean = true;
  showProject:boolean= true;
  projects: any[] = [];
  formData = {title:'', description:'', keywords:'', technologies:'',owner:''}

  accordionItems: any[] = [];

  toggleAccordionItem(item:any) {
    item.active = !item.active;
  }

  constructor(private projectService: ProjectService, private router:Router,private http:HttpClient){}

ngOnInit(): void {
  this.projectService.getAllProjects().subscribe((result)=>{
    this.projects=result as any;
  })

  this.http.get(`http://localhost:8080/getAllTeams`).subscribe((result2)=>{
    this.accordionItems = result2 as any;
  })
}

onSubmit(){
  this.projectService.createProject(this.formData).subscribe((project)=>{
    console.log("Data Sent Successfully : ",project);
    this.createSectionVisible = false;
    this.router.navigate(['/projectManagement']);
  },(error)=>{
      console.error('Error :',error);
      
  });
}

retrieve(projectId:any){
  this.showProject=true;
  this.projectService.getProjectbyId(projectId).subscribe((project)=>{
    this.editedProject = project;
    this.updatedProject = { ...this.editedProject}
    localStorage.setItem("projectId",projectId);
  })
}

edit(projectId:any){
  this.projectService.updateProject(projectId,this.updatedProject).subscribe((response)=>{
    console.log('Data Updated Successfully :', response);
    this.router.navigate(['/projectManagement']);
    this.showProject= false;
  },(error)=>{
    console.error('Error :',error);
    
  })
}

delete(id:number){
  this.projectService.deleteProject(id).subscribe((response)=>{
    console.log('Project Deleted ',response);
    this.router.navigate(['/projectManagement']);
    this.showProject= false;
  }, (error)=>{
    console.error('Error :',error);
    
  })
}
updateProjectTeam(teamId:any){
  this.updatedTeamProject={"id":teamId}
  this.projectService.updateProjectTeam(localStorage.getItem("projectId"),this.updatedTeamProject).subscribe((response)=>{
    console.log('Data Updated Successfully : ',response)
  },(error)=>{
    console.error('Error : ',error);
    
  })
}

}
