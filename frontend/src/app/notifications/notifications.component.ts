import { Component , OnInit, Output, EventEmitter} from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  template:`
  <div *ngFor="let notification of filteredNotifications">
    {{ notification.message }}
  </div>
`,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  notifications: any[] = [];
  filteredNotifications: any[] = [];

  @Output() notificationClick: EventEmitter<any> = new EventEmitter();


  constructor(private notificationService: NotificationsService, private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    console.log('User:', user);
  
    this.notificationService.getAllNotifs().subscribe((result) => {
      this.notifications = result as any;
      console.log('All Notifications:', this.notifications);
  
      // Filter notifications based on receiver name
      this.filteredNotifications = this.notifications.filter(
        (notif) => notif.receiver === user
      );
      console.log('Filtered Notifications:', this.filteredNotifications);
    });
  }

}
