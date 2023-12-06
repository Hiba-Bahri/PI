import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './team-management/team-management.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
import { RDVComponent} from './rdv/rdv.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path: 'teamManagement', component:TeamManagementComponent},
  {path: 'memberManagement', component:MemberManagementComponent},
  {path: 'projectManagement', component:GestionProjectComponent},
  {path: 'RDVManagement', component:RDVComponent},
  {path: 'project', component:ProjectComponent},
  {path:'',redirectTo:'/RDVManagement', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }
