import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotek',
  templateUrl: './cotek.component.html',
  styleUrls: ['./cotek.component.css']
})
export class CotekComponent implements OnInit {
  
  isLoggedIn = false;

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userRole = localStorage.getItem('userRole');

    if (user && userRole) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
  }
}
