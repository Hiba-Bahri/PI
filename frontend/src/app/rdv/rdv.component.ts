import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RDVComponent implements OnInit{
  appointments: any[] = []
  constructor(private appointmentService: AppointmentService){}

  ngOnInit(): void {
      this.appointmentService.getAllAppointments().subscribe((result)=>{
        console.log(result)
        this.appointments= result as any
        
      })
  }
  convertToDate(dateArray: number[]): Date {
    // Assuming dateArray is in the format [year, month, day]
    const [year, month, day] = dateArray;
  
    // Note: month is zero-based in JavaScript Dates, so we subtract 1
    return new Date(year, month - 1, day);
  }

  convertToTime(timeArray: number[]): Date {
    return new Date(1970, 0, 1, timeArray[0], timeArray[1]);
  }

  acceptAppointment(appointmentId: number): void {
    this.appointmentService.acceptAppointment(appointmentId).subscribe(() => {
      // Reload the list of appointments or update the specific appointment in the local array.
      this.reloadAppointments();
    });
  }

  rejectAppointment(appointmentId: number): void {
    this.appointmentService.rejectAppointment(appointmentId).subscribe(() => {
      // Reload the list of appointments or update the specific appointment in the local array.
      this.reloadAppointments();
    });
  }

  private reloadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe((result) => {
      this.appointments = result as any;
    });
  }

}
