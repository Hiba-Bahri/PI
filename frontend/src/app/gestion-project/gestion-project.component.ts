import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-gestion-project',
  templateUrl: './gestion-project.component.html',
  styleUrls: ['./gestion-project.component.css']
})
export class GestionProjectComponent implements OnInit{
  editedProject:any={};
  updatedProject:any={};
  createSectionVisible: boolean = true;
  showProject:boolean= true;
  projects: any[] = [];
  formData = {title:'', description:'', keywords:'', technologies:'',owner:''}
  constructor(private projectService: ProjectService, private router:Router){}

ngOnInit(): void {
  this.projectService.getAllProjects().subscribe((result)=>{
    this.projects=result as any;
  })
}

onSubmit(){
  this.projectService.createProject(this.formData).subscribe((project)=>{
    console.log("Data Sent Successfully : ",project);
    this.createSectionVisible = false;
    this.router.navigate(['/']);
  },(error)=>{
      console.error('Error :',error);
      
  });
}

retrieve(projectId:any){
  this.showProject=true;
  this.projectService.getProjectbyId(projectId).subscribe((project)=>{
    this.editedProject = project;
    this.updatedProject = { ...this.editedProject}
  })
}

edit(projectId:any){
  this.projectService.updateProject(projectId,this.updatedProject).subscribe((response)=>{
    console.log('Data Updated Successfully :', response);
    this.router.navigate(['/']);
    this.showProject= false;
  },(error)=>{
    console.error('Error :',error);
    
  })
}

delete(id:number){
  this.projectService.deleteProject(id).subscribe((response)=>{
    console.log('Project Deleted ',response);
    this.router.navigate(['/']);
    this.showProject= false;
  }, (error)=>{
    console.error('Error :',error);
    
  })
}

}
