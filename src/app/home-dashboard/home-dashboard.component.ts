import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { StoryService } from '../add-story/story.service';

interface Story {
  id?: number;
  image: string;
  createdBy: string;
  reviewedBy: string;
  team: string;
  title?: string;
  content?: string;
}

@Component({
  standalone: true,
  selector: 'app-home-dashboard',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    FormsModule,
    BottomNavComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit{

  user = {
    name: 'Abby Steinfest',
    role: 'Incoming Software Engineering Intern',
    team: 'Shell'
  };

  selectedTeam = '';
  searchTopic = '';
  teams = ['Shell', 'Cybersecurity', 'Event Management', 'Analytic Science'];

  stories: Story[] = [];
  filteredStories: Story[] = [];

  constructor(private router: Router, private storyService: StoryService) {}

  ngOnInit(): void {
    this.stories = this.storyService.getStories();
    this.filteredStories = [...this.stories];
  }

  filterStories(): void {
    const term = this.searchTopic.toLowerCase();
    const team = this.selectedTeam;
    this.filteredStories = this.stories.filter(story =>
      (!term || story.createdBy.toLowerCase().includes(term)) &&
      (!team || story.team === team)
    );
  }

  onStoryClick(story: Story): void {
    // Navigate to story-board page when a story card is clicked
    this.router.navigate(['/story-board'], { 
      queryParams: { 
        storyId: story.id,
        creator: story.createdBy,
        image: story.image,
        title: story.title,
        content: story.content, 
      } 
    });
  }

  trackByIndex(index: number, story: Story): number {
    return story.id || index;
  }
}