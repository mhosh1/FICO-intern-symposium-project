import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { AddStoryComponent } from './add-story/add-story.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blank', component: BlankPageComponent },
  { path: 'home', component: HomeDashboardComponent },
  { path: 'add-story', component: AddStoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];