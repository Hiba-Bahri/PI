import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { MemberService } from '../member.service';
@Component({
  selector: 'app-member-task-management',
  templateUrl: './member-task-management.component.html',
  styleUrls: ['./member-task-management.component.css']
})
export class MemberTaskManagementComponent implements OnInit {
  createSectionVisible: boolean = true;
  formData = { name: '', members: [] };
  tasks: any[] = [];
  members: any[] = [];
  devMembers: any[] = [];
  testMembers: any[] = [];
  scrumManagers: any[] = [];
  teamName: String = '';
  count: number = 0;

  constructor(
    private taskService: TaskService,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(localStorage.getItem("userId"));
    this.taskService.getAllTasksByMemberId(localStorage.getItem("userId")).subscribe((data: any) => {
      console.log(data);
      this.tasks = data;


    });
  }

  onSubmit() {

  }

  toggleTaskStatus(task: any) {
    const newStatus = task.progress === 'Finished' ? 'In Progress' : 'Finished';
    if (newStatus === 'Finished') {
      this.taskService.updateTaskStatus("Finished", task.id).subscribe(() => {
      }, error => {
        console.error('Error updating task status:', error);
      });
    } else {
      this.taskService.updateTaskStatus("In progress", task.id).subscribe(() => {
      }, error => {
        console.error('Error updating task status:', error);
      });
    }

  }

}