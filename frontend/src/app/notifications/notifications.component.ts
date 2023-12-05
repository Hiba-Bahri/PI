import { Component , OnInit} from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  template:`
  <div *ngFor="let notification of notifications">
    {{ notification.message }}
  </div>
`,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  notifications: any[] = [];

  constructor(private notificationService: NotificationsService, private router:Router,private http:HttpClient){}
  ngOnInit() : void{
    this.notificationService.getAllNotifs().subscribe((result)=>{
      this.notifications=result as any;
      console.log(this.notifications)
    })
  }

}
