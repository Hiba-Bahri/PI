import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-cotek',
  templateUrl: './cotek.component.html',
  styleUrls: ['./cotek.component.css']
})
export class CotekComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private router:Router, private http:HttpClient){}
  formData = {firstName:'', lastName:'', email:'', appointmentDate:'',appointmentTime:'',status:''}
  
  isLoggedIn = false;

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userRole = localStorage.getItem('userRole');

    if (user && userRole) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header") as HTMLElement;
      header.classList.toggle("sticky", window.scrollY > 0);
    });
    
    const menu = document.querySelector('#menu-icon') as HTMLElement;
    const navmenu = document.querySelector('.navmenu') as HTMLElement;
    
    menu.onclick = () => {
      menu.classList.toggle('bx-x');
      navmenu.classList.toggle('open');
    };
    

  }

  onSubmit(){
    this.formData.status = 'pending';
    this.appointmentService.createAppointment(this.formData).subscribe((appointment)=>{
      console.log("Data Sent Successfully : ",appointment);
      this.router.navigate(['/']);
    },(error)=>{
        console.error('Error :',error);
        
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
  }

}
