import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { MemberService } from '../member.service';

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
  formData = { description: '', progress: '', member: null };

  constructor(
    private taskService: TaskService,
    private memberService: MemberService,
    private router: Router
  ) {}


  
  ngOnInit(){
    this.taskService.getAllTasks().subscribe((t: any) => {
      this.tasks = t;
      this.ongoingTasks = this.tasks.filter((task) => task.progress === 'In progress');
      this.finishedTasks = this.tasks.filter((task) => task.progress === 'Finished');

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
  
}
