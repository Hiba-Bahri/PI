import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './team-management/team-management.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
import { RDVComponent} from './rdv/rdv.component';

const routes: Routes = [
  {path: 'teamManagement', component:TeamManagementComponent},
  {path: 'projectManagement', component:GestionProjectComponent},
  {path: 'RDVtManagement', component:RDVComponent},
  {path:'',redirectTo:'/teamManagement', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }
