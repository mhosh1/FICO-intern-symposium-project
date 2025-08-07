import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() title: string = 'What is Kubernetes?';
  @Input() author: string = 'By Mohammad Hosh';
  @Input() content: string = `Kubernetes is an open-source platform designed to automate the deployment, scaling, and management of containerized applications. It provides a robust framework for orchestrating workloads across a cluster of machines, ensuring high availability and efficient resource utilization. By abstracting underlying infrastructure, Kubernetes simplifies the complexities of managing modern, distributed applications in various environments, including on-premises, public cloud, and hybrid setups.`;
  
  // Initialize with default image
  contentImageUrl: string = "assets/images/K8's.png";

  // Properties to store data from navigation
  creator: string = '';
  reviewer: string = '';
  storyImage: string = '';
  team: string = '';

  likeCount = 0;
  isLiked = false;
  postDate: Date = new Date();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get data passed from navigation
    this.route.queryParams.subscribe(params => {
      if (params['creator']) {
        this.creator = params['creator'];
        this.author = `By ${this.creator}`;
      }
      
      if (params['reviewer']) {
        this.reviewer = params['reviewer'];
      }
      
      // Always keep the Kubernetes image, ignore the navigation image
      if (params['image']) {
        this.storyImage = params['image'];
        // Keep the default Kubernetes image
        this.contentImageUrl = "assets/images/K8's.png";
      }
      
      if (params['team']) {
        this.team = params['team'];
      }
    });
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.likeCount = this.isLiked ? this.likeCount + 1 : this.likeCount - 1;
  }

  // Add these methods for image debugging
  onImageError(event: any) {
    console.error('Image failed to load:', this.contentImageUrl);
    console.error('Error event:', event);
    // Fallback to default image
    this.contentImageUrl = "assets/images/K8's.png";
    console.log('Switched to fallback image:', this.contentImageUrl);
  }

  onImageLoad(event: any) {
    console.log('Image loaded successfully:', this.contentImageUrl);
  }
  onHomeClick() {
    console.log('Home button clicked');
    // Add navigation logic here
  }

  onAddStoryClick() {
    console.log('Add Story button clicked');
    // Add story creation logic here
  }

  onSpaceClick() {
    console.log('Space button clicked');
    // Add space view logic here
  }
}