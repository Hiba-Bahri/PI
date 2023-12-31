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
import { LoginComponent } from './login/login.component';
import { CotekComponent } from './cotek/cotek.component';
import { authGuard } from './auth.guard';
import { authGuardpm } from './auth.guard';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ClientManagementComponent } from './client-management/client-management.component';

const routes: Routes = [
  {path: 'teamManagement', component:TeamManagementComponent, canActivate: [authGuard]},
  {path: 'memberManagement', component:MemberManagementComponent, canActivate: [authGuard]},
  {path: 'projectManagement', component:GestionProjectComponent, canActivate: [authGuard]},
  {path: 'RDVManagement', component:RDVComponent, canActivate: [authGuard]},
  {path: 'project', component:ProjectComponent, canActivate: [authGuardpm]},
  {path: 'Projects', component:ProjectManagerComponent, canActivate: [authGuardpm]},
  {path: 'Project/:projectId', component:ProjectComponent, canActivate: [authGuardpm]},
  {path: 'notifications', component:NotificationsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'login',component: LoginComponent },
  {path: 'appointmentForm', component: AppointmentFormComponent},
  {path :'clientManagement', component: ClientManagementComponent, canActivate: [authGuard]},
  {path: '',component:CotekComponent},
  {path:'',redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }
