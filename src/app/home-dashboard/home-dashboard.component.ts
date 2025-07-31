import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';


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

  //styleUrl: './home-dashboard.component.css'
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

  stories = [
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service'
    },
    {
      image: 'Product_01.jpg',
      createdBy: 'Ana Steinberg',
      reviewedBy: 'Jeff Service'
    }
    // Duplicate or more dummy data
  ];

  filteredStories = [...this.stories];

  ngOnInit(): void {
    this.filteredStories = this.stories;
  }


  filterStories(): void {
    const term = this.searchTopic.toLowerCase();
    this.filteredStories = this.stories.filter(story =>
      story.createdBy.toLowerCase().includes(term)
    );
  }
}
