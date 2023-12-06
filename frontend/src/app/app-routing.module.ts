import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './team-management/team-management.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
import { RDVComponent} from './rdv/rdv.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectComponent } from './project/project.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: 'teamManagement', component:TeamManagementComponent},
  {path: 'memberManagement', component:MemberManagementComponent},
  {path: 'projectManagement', component:GestionProjectComponent},
  {path: 'RDVManagement', component:RDVComponent},
  {path: 'project', component:ProjectComponent},
  {path: 'Projects', component:ProjectManagerComponent},
  {path: 'Project/:projectId', component:ProjectComponent},
  {path: 'notifications', component:NotificationsComponent},
  {path: 'chat', component: ChatComponent},
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
