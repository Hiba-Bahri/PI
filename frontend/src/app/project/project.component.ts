import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { MemberService } from '../member.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  tasks: any[] = [];
  finishedTasks: any[] = [];
  ongoingTasks: any[] = [];
  members: any[] = [];
  taskMembers: any[] = [];
  formDataCreate = { description: '', progress: 'In progress', member: null, project: null };
  selectedMember: any;
  formDataEdit: any = {};
  project: any;
  selectedWorkMethodology: string = 'Scrum';
  projectId: any ;

  constructor(
    private taskService: TaskService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute, 
    private projectService:ProjectService
  ) {}
  
  ngOnInit(){

    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      this.projectService.getProjectbyId(this.projectId).subscribe((result)=>{
        this.project= result as any;
        console.log(this.project);
        this.formDataCreate.project=this.project;
        /*const projectJSON = JSON.stringify(this.project);
        this.formDataCreate.project= projectJSON;*/

      })

      this.taskService.getAllTasksByProjectId(this.projectId).subscribe((t: any) => {
        this.tasks = t;
        this.ongoingTasks = this.tasks.filter((task) => task.progress === 'In progress');
        this.finishedTasks = this.tasks.filter((task) => task.progress === 'Finished');
      });

  })
  }

  onSubmit() {
    if (this.formDataCreate.project !== null) {
      this.taskService.createTask(this.formDataCreate).subscribe((response) => {
        console.log('Task added successfully:', response);
        this.ngOnInit();
      });
    } else {
      console.error('Project is null.');
    }
  }
  

  onMemberSelectChange(event: any, member: any): void {
    const selectedMember = event.target.value;
    this.formDataEdit.member = selectedMember;
  }
  

  updateTask(id: number) {
    this.formDataEdit.member = this.selectedMember;
    console.log("New Edited Task:");
    console.log(this.formDataEdit);
    this.taskService.updateTask(id, this.formDataEdit).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  

  remove(taskId: number){
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.ngOnInit();
  });
  
  }
  
  save_work_methodology(id: number) {
    let updatedProject = { ...this.project, methodology: this.selectedWorkMethodology };

    this.projectService.updateProject(id, updatedProject).subscribe((res)=>{
      console.log("Work Methodology updated successfuly",res);
      this.ngOnInit()
    })
    };
    showMembers = false;
    toggleMembers(){
      this.showMembers = !this.showMembers;
    }
}