// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // Remove components from declarations - they're standalone
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
      HttpClientModule,
    AppComponent,      // Import standalone components here
    SignupComponent    // Import standalone components here
    ,LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }