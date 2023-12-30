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
  formData = { description: '', progress: 'In Progress', member: null };
  project: any;
  selectedWorkMethodology: string = 'Scrum';

  constructor(
    private taskService: TaskService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute, 
    private projectService:ProjectService
  ) {}
  
  ngOnInit(){

    this.route.params.subscribe(params => {
      const projectId = params['projectId'];

      this.projectService.getProjectbyId(projectId).subscribe((result)=>{
        this.project= result as any;
        // console.log(this.project)
      })
  })

    this.taskService.getAllTasks().subscribe((t: any) => {
      this.tasks = t;
      this.ongoingTasks = this.tasks.filter((task) => task.progress === 'In progress');
      console.log("ON GOING",this.ongoingTasks)
      this.finishedTasks = this.tasks.filter((task) => task.progress === 'Finished');
      console.log("FINISHED",this.ongoingTasks)
    });

    this.memberService.getAllMembers().subscribe((members: any) => {
      this.members = members;
      this.taskMembers = this.members.filter((member) => member.occupation === 'Developper' || member.occupation === 'Tester');
    }); 
  }

  onSubmit() {
    console.log(this.formData);
    this.taskService.createTask(this.formData).subscribe((response) => {
      console.log('Task added successfully:', response);
      this.ngOnInit();
    });
  }


  updateTask(id:number){
    this.taskService.updateTask(id, this.formData).subscribe(()=>{
      this.ngOnInit
    });
  }

  remove(taskId: number){
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.router.navigate(['/project']);
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