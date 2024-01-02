import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { MemberService } from '../member.service';
import { ProjectService } from '../project.service';
import { NotificationsService } from '../notifications.service';
import { Member } from '../member.model';


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
  member: Member | null = null;
  formDataCreate = { description: '', progress: 'In progress', member: null, project: null };
  selectedMember: any;
  formDataEdit: any = {};
  project: any;
  selectedWorkMethodology: string = 'Scrum';
  projectId: any ;
  notif={message:'',receiver:''}

  constructor(

    private taskService: TaskService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute, 
    private projectService:ProjectService,
    private notificationService: NotificationsService
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      this.projectService.getProjectbyId(this.projectId).subscribe((result)=>{
        this.project= result as any;
        console.log("fetched Project",this.project);
        this.formDataCreate.project=this.project;
        /*const projectJSON = JSON.stringify(this.project);
        this.formDataCreate.project= projectJSON;*/

      })

      this.taskService.getAllTasksByProjectId(this.projectId).subscribe((t: any) => {
        this.tasks = t;
        this.ongoingTasks = this.tasks.filter((task: any) => task.progress === 'In progress');
        this.finishedTasks = this.tasks.filter((task: any) => task.progress === 'Finished');
      });
    });
  }

  onSubmit() {
    if (this.formDataCreate.project !== null) {
      this.taskService.createTask(this.formDataCreate).subscribe((response) => {
        // this.notif.message='A new task is affected to you';
        // this.notif.receiver!= this.formDataCreate.member;
        console.log('Task added successfully:', response);
        // this.notificationService.saveNotif(this.notif).subscribe((not)=>{
        //   console.log("Notification saved")
        // })
        this.ngOnInit();
      });
    } else {
      console.error('Project is null.');
    }
  }

  onMemberSelectChange(event: any, member: any): void {
    const selectedMember = event.target.value;
    this.formDataCreate.member = selectedMember;
  }

  updateTask(id: number) {
    this.formDataEdit.member = this.selectedMember;
    console.log('New Edited Task:');
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

  remove(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.ngOnInit();
    });
  }

  save_work_methodology(id: number) {
    let updatedProject = { ...this.project, methodology: this.selectedWorkMethodology };
  
    console.log('Updated Project:', updatedProject); // Log the updated project for debugging
  
    this.projectService.updateProject(id, updatedProject).subscribe(
      (res) => {
        console.log('Work Methodology updated successfully', res);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error updating work methodology:', error);
      }
    );
  }
    showMembers = false;
    toggleMembers(){
      this.showMembers = !this.showMembers;
    }
}
