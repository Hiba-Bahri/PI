import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthContentComponent } from './auth/auth-content/auth-content.component';
import { WelcomeContentComponent } from './auth/welcome-content/welcome-content.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ContentComponent } from './auth/content/content.component';
import { ButtonsComponent } from './auth/buttons/buttons.component';
import { GestionEquipeComponent } from './gestion-equipe/gestion-equipe.component';
import { GestionProjectComponent } from './gestion-project/gestion-project.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent,
    GestionEquipeComponent,
    GestionProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
