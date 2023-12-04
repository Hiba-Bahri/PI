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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
