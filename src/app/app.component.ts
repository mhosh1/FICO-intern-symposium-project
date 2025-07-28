import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HomeDashboardComponent } from "./home-dashboard/home-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HomeDashboardComponent]
})
export class AppComponent {
  title = 'fico-intern-dashboard';
}
