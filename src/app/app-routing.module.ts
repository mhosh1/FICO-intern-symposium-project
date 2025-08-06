// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BlankPageComponent } from './blank-page/blank-page.component'; 
import { AddStoryComponent } from './add-story/add-story.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'signup', component: SignupComponent },         // /signup shows SignupComponent
  { path: 'login', component: LoginComponent },           // /login shows LoginComponent
  { path: 'add-story', component: AddStoryComponent },           // /login shows LoginComponent
  { path: 'blank', component: BlankPageComponent },       // Add this line for blank page
  { path: '**', redirectTo: '/login' }                   // Any other route goes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
