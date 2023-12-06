import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  showNotification: boolean = false;

  toggleNotification() {
    this.showNotification = !this.showNotification;
  }
}
