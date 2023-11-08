import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import {HttpClientModule} from '@angular/common/http';
>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd

import { AppComponent } from './app.component';
import { AuthContentComponent } from './auth/auth-content/auth-content.component';
import { WelcomeContentComponent } from './auth/welcome-content/welcome-content.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ContentComponent } from './auth/content/content.component';
import { ButtonsComponent } from './auth/buttons/buttons.component';
<<<<<<< HEAD
import { TeamManagementComponent } from './team-management/team-management.component';
import { SideBarComponent } from './side-bar/side-bar.component';
=======
import { GestionEquipeComponent } from './gestion-equipe/gestion-equipe.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent,
<<<<<<< HEAD
    TeamManagementComponent,
    SideBarComponent
=======
    GestionEquipeComponent,
    GestionProjectComponent
>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd
  ],
  imports: [
    BrowserModule,
    FormsModule,
<<<<<<< HEAD
    AppRoutingModule,
    HttpClientModule
=======
    HttpClientModule,
    AppRoutingModule
>>>>>>> b3e097716d5f3aa1b69c18d7b0ec66b6145d1fcd
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
