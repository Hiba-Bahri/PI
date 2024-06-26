import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthContentComponent } from './auth/auth-content/auth-content.component';
import { WelcomeContentComponent } from './auth/welcome-content/welcome-content.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ContentComponent } from './auth/content/content.component';
import { ButtonsComponent } from './auth/buttons/buttons.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
import { AppRoutingModule } from './app-routing.module';
import { RDVComponent } from './rdv/rdv.component';

import { MemberManagementComponent } from './member-management/member-management.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import { ProjectComponent } from './project/project.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotificationsComponent } from './notifications/notifications.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { LoginComponent } from './login/login.component';
import { CotekComponent } from './cotek/cotek.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { MemberTaskManagementComponent } from './member-task-management/member-task-management.component';
import { ClientProjectDetailsComponent } from './client-project-details/client-project-details.component';
import { AboutComponent } from './about/about.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent,
    TeamManagementComponent,
    SideBarComponent,
    
    GestionProjectComponent,
          RDVComponent,

          MemberManagementComponent,

          ChatComponent,
            ProjectComponent,
            ProjectManagerComponent,
            NotificationsComponent,
            LoginComponent,
            CotekComponent,
            AppointmentFormComponent,
            ClientManagementComponent,
            MemberTaskManagementComponent,
            ClientProjectDetailsComponent,
            AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    EmojiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
