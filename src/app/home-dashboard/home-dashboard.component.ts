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

interface Story {
  id?: number;
  image: string;
  createdBy: string;
  reviewedBy: string;
  team: string;
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

  stories: Story[] = [
    {
      id: 1,
      image: 'Product_01.jpg',
      createdBy: 'Arin Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 2,
      image: 'Product_02.jpg',
      createdBy: 'Brian Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 3,
      image: 'Product_03.jpg',
      createdBy: 'Mohamed Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 4,
      image: 'Product_04.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 5,
      image: 'Product_05.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 6,
      image: 'Product_06.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell'
    },
    {
      id: 7,
      image: 'Product_07.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Event Management'
    },
    {
      id: 8,
      image: 'Product_08.jpg',
      createdBy: 'Ana Steinberg',
      reviewedBy: 'Jeff Service',
      team: 'Cybersecurity'
    }
  ];

  filteredStories: Story[] = [...this.stories];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredStories = this.stories;
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
        image: story.image
      } 
    });
  }

  trackByIndex(index: number, story: Story): number {
    return story.id || index;
  }
}