import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeDashboardComponent } from "./home-dashboard/home-dashboard.component";
import { StoryComponent } from "./home-dashboard/Story-board/story.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HomeDashboardComponent, StoryComponent, RouterOutlet]
})
export class AppComponent {
  title = 'fico-intern-dashboard';
}