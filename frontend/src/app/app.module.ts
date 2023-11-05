import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './auth/header/header.component';
import { AuthContentComponent } from './auth/auth-content/auth-content.component';
import { WelcomeContentComponent } from './auth/welcome-content/welcome-content.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ContentComponent } from './auth/content/content.component';
import { ButtonsComponent } from './auth/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
