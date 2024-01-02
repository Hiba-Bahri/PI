import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit{

  private http: HttpClient;
  clients: any[] =[];
  showForm: boolean = false;


  showAddClientForm() {
    this.showForm = true;
  }

  hideAddClientForm() {
    this.showForm = false;
  }

  constructor(private userService: UserService, http:HttpClient) {
    this.http=http;
  }
  userFormdata={firstName:'',lastName:'',email:'',login:'',password:'',role:'',tel:''}
  onSubmit(): void {
    this.userFormdata.role='client'
    this.userService.createClient(this.userFormdata).subscribe((result)=>{
      console.log("Data Sent Successfully : ",result);
      this.hideAddClientForm();
      location.reload()
    })
  }

  ngOnInit(): void {
      this.http.get(`http://localhost:8080/getAllClients`).subscribe((result)=>{
        this.clients = result as any;
        console.log(this.clients)
      })
  }
}
