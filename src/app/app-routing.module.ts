// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  //{ path: 'login', component: LoginComponent },           // /login shows LoginComponent
  { path: 'signup', component: SignupComponent },         // /signup shows SignupComponent
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }                   // Any other route goes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
