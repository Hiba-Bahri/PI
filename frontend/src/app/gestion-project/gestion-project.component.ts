import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
import { Team } from '../team.model';
import { NotificationsService } from '../notifications.service';
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
  formData = {title:'', description:'', keywords:'', technologies:'',owner:null,status:''}
  notif = {message:'', receiver:''}
  team :any={};

  accordionItems: any[] = [];

  clients: any [] = [];
  availableTeams: Team[] = [];


  toggleAccordionItem(item:any) {
    item.active = !item.active;
  }

  constructor(private projectService: ProjectService, private router:Router,private http:HttpClient, private notificationService: NotificationsService){}



ngOnInit(): void {
  this.projectService.getAllProjects().subscribe(
    (result) => {
      this.projects = result as any;
      console.log(this.projects);
    },
    (error) => {
      console.error('Error fetching projects:', error);
    }
  );

  this.http.get(`http://localhost:8080/getAllTeams`).subscribe((result2)=>{
    this.accordionItems = result2 as any;

    if (Array.isArray(result2)) {
      // Find available teams
      this.accordionItems = result2.filter((team: Team) => {
        // Check if the team's id is not present in any project's team.id
        return !this.projects.some(project => project.team && project.team.id === team.id);
      });
      console.log('Available Teams:', this.accordionItems);
    }})

  this.projectService.getAllClients().subscribe((clientList)=>{
    this.clients = clientList as any;

    this.clients = this.clients.filter(client => !client.ownedProject);

  })
}

onSubmit(){
  this.formData.status = 'In Progress';
  this.projectService.createProject(this.formData).subscribe((project)=>{
    console.log("Data Sent Successfully : ",project);
    this.createSectionVisible = false;
    this.notif.message="Your project has been created";
    this.notif.receiver=project.owner.login;
    this.notificationService.saveNotif(this.notif).subscribe((not)=>{
      console.log(not);
      
    })
    this.router.navigate(['/projectManagement']);
    this.ngOnInit();
  },(error)=>{
      console.error('Error :',error);
      
  });
}
retrieve(projectId: any) {
  this.showProject = true;
  this.projectService.getProjectbyId(projectId).subscribe((project) => {
     this.editedProject = project;
     localStorage.setItem('projectToEdit', project.owner.login)
     this.updatedProject = { ...this.editedProject };

      

     // Ensure updatedProject.owner is initialized and set to the correct client
     if (this.clients.length > 0) {
        this.updatedProject.owner = this.clients.find(client => client.id === this.editedProject.owner.id) || this.clients[0];
     }

     localStorage.setItem("projectId", projectId);
  });
}

edit(projectId:any){
  this.projectService.updateProject(projectId,this.updatedProject).subscribe((response)=>{

    this.notif.message="Your project is edited"
  if('projectToEdit' in localStorage){
    this.notif.receiver = localStorage.getItem('projectToEdit') ?? '' ;
  }
  this.notificationService.saveNotif(this.notif).subscribe((not)=>{
    console.log(not);
  })
    console.log('Data Updated Successfully :', response);
    this.router.navigate(['/projectManagement']);
    this.ngOnInit()
    this.showProject= false;
  },(error)=>{
    console.error('Error :',error);
    
  })
}


delete(id:number){
  this.updatedProject.status = 'Finished';
  this.notif.message="Your project is finished"
  if('projectToEdit' in localStorage){
    this.notif.receiver = localStorage.getItem('projectToEdit') ?? '' ;
  }
  this.notificationService.saveNotif(this.notif).subscribe((not)=>{
    console.log(not);
  })
  this.edit(id);
}
// delete(id:number){
//   this.projectService.deleteProject(id).subscribe((response)=>{
//     console.log('Project Deleted ',response);
//     this.router.navigate(['/projectManagement']);
//     this.showProject= false;
//   }, (error)=>{
//     console.error('Error :',error);
    
//   })
// }

updateProjectTeam(teamId:any){
  this.updatedTeamProject={"id":teamId}
  this.projectService.updateProjectTeam(localStorage.getItem("projectId"),this.updatedTeamProject).subscribe((response)=>{
    this.http.get(`http://localhost:8080/getTeamById/${teamId}`).subscribe((result)=>{
      this.team=result;
      this.notif.message="The Team "+this.team.name+" Is assigned to your project"
      if('projectToEdit' in localStorage){
        this.notif.receiver = localStorage.getItem('projectToEdit') ?? '' ;
      }
      this.notificationService.saveNotif(this.notif).subscribe((not)=>{
        console.log(not);
      })

      this.notif.message="Your team has been affected to a project"
        this.notif.receiver = this.team.members.find((member:any) => member.role === 'project manager').login ?? '' ;
      
      this.notificationService.saveNotif(this.notif).subscribe((not)=>{
        console.log(not);
      })
      
    })
    
    console.log('Data Updated Successfully : ',response)
  },(error)=>{
    console.error('Error : ',error);
    
  })
}

showFinishedProjects = false;

  toggleShowFinishedProjects() {
    this.showFinishedProjects = !this.showFinishedProjects;
  }
  
}
