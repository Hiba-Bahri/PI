import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './team-management/team-management.component';


const routes: Routes = [
  {path: 'teamManagement', component:TeamManagementComponent},
  {path:'',redirectTo:'/teamManagement', pathMatch: 'full'}
];
=======


>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd

@NgModule({
  declarations: [],
  imports: [
<<<<<<< HEAD
    RouterModule.forRoot(routes), 
    CommonModule],
  exports: [RouterModule]

=======
    CommonModule
  ]
>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd
})
export class AppRoutingModule { }
