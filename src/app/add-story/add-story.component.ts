import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";

import { StoryService, Story } from './story.service';
import { Router } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';


@Component({
  standalone: true,
  selector: 'add-story-page',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    FormsModule,
    BottomNavComponent,
    EditorModule
],
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit{
  

  constructor(
    private storyService: StoryService,
    private router: Router
  ) {}

  user = {
    name: 'Abby Steinfest',
    role: 'Incoming Software Engineering Intern',
    team: 'Shell'
  };

  selectedTeam = '';
  searchTopic = '';
  teams = ['Shell', 'Cybersecurity', 'Event Management', 'Analytic Science'];
  storyContent: string = '';
  storyTitle = '';

  ngOnInit(): void {
  
  }

  coverPhotoPreview: string | null = null;

  onCoverPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.coverPhotoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  yourImageUploadHandler = (blobInfo: any, success: (url: string) => void, failure: (err: string) => void) => {
    const base64 = blobInfo.base64();
    const url = 'data:' + blobInfo.blob().type + ';base64,' + base64;
    this.coverPhotoPreview = url;
    success(url);
  };
  
  onSubmit(): void {
    const newStory: Story = {
    image: this.coverPhotoPreview || 'Product_09.jpg',
    createdBy: this.user.name,
    reviewedBy: 'Pending',
    team: this.selectedTeam || this.user.team,
    title: this.storyTitle || 'Untitled Story',
    content: this.storyContent || '',
    imageForStory: this.coverPhotoPreview || 'kubernetes.jpg' // Use the cover photo as the story image
    };
    console.log('Cover Photo Preview:', this.coverPhotoPreview);

    this.storyService.addStory(newStory);
    this.router.navigate(['/home']);
  }
}
