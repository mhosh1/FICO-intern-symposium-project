import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddStoryComponent } from "./add-story/add-story.component";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AddStoryComponent]
})
export class AppComponent {
  title = 'add-story-page';
}
