import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{


  constructor(private router:Router){}
  
  userRoles: string[] = []; // Define the userRoles property

  showNotification: boolean = false;

  ngOnInit() {
    // Fetch user roles from local storage or wherever you store them
    const userRolesString = localStorage.getItem('userRole');
    // Set user roles in a variable or use as needed
    if (userRolesString){
      this.userRoles= userRolesString.split(',');
    }
  }

  hasRole(role: string):boolean{
    return this.userRoles.includes(role);
  }

  toggleNotification() {
    this.showNotification = !this.showNotification;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']).then(() => {
      // After navigation, reload the page
      location.reload();
  }); 
  }


}
