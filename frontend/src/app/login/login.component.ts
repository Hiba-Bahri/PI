// login.component.ts
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    user = { login: '', password: '' };

    constructor(private loginService: LoginService,private router:Router) {}

    login() {
        this.loginService.login(this.user).subscribe(
            (user: User) => {
                if (user) {
                    console.log('Authenticated');
                    console.log('User details:', user);
                    localStorage.setItem('user',user.login);
                    localStorage.setItem('userRole',user.role);
                    // Store user details in a service or component for later use
                    this.router.navigate(['/']).then(() => {
                        // After navigation, reload the page
                        location.reload();
                    });
                } else {
                    console.log('Unexpected response: Login failed');
                }
            },
            error => {
              if (error.status === 401) {
                  console.log('Login failed: Unauthorized');
              } else {
                  console.error('Error during login:', error);
              }
          }
          
        );
    }
}
