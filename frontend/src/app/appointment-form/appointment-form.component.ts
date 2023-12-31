import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {

  constructor(private appointmentService:AppointmentService, private router:Router, private http:HttpClient){}
  formData = {firstName:'', lastName:'', email:'', appointmentDate:'',appointmentTime:'',status:''}

  onSubmit(){
    this.formData.status = 'pending';
    this.appointmentService.createAppointment(this.formData).subscribe((appointment)=>{
      console.log("Data Sent Successfully : ",appointment);
      this.router.navigate(['/']);
    },(error)=>{
        console.error('Error :',error);
        
    });
  }

}
