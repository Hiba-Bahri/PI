import { Component} from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent{
  constructor(private userService: UserService) {}

  userFormdata={firstName:'',lastName:'',email:'',login:'',password:'',role:'',tel:''}
  onSubmit(): void {
    this.userFormdata.role='client'
    this.userService.createClient(this.userFormdata).subscribe((result)=>{
      console.log("Data Sent Successfully : ",result);
      location.reload()
    })
  }
}
