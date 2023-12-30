import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  islogged():boolean{
    if ('userRole' in localStorage){
      return true;
    }else{
      return false
    }
  }

  title = 'frontend';
}
