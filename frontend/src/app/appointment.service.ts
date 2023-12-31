import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl= 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllAppointments(){
    return this.http.get(`${this.baseUrl}/getAllAppointments`)
  }

  createAppointment(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/createAppointment`, data);
  }

  acceptAppointment(appointmentId: number): Observable<any> {
    const url = `${this.baseUrl}/appointment/${appointmentId}/accept`;
    return this.http.post(url, {});
  }

  rejectAppointment(appointmentId: number): Observable<any> {
    const url = `${this.baseUrl}/appointment/${appointmentId}/reject`;
    return this.http.post(url, {});
  }

  
}
