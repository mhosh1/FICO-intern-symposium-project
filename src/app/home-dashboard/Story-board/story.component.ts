import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  @Input() title: string = 'What is Kubernetes?';
  @Input() author: string = 'By Mohammad Hosh';
  @Input() content: string = `Kubernetes is an open-source platform designed to automate the deployment, scaling, and management of containerized applications. It provides a robust framework for orchestrating workloads across a cluster of machines, ensuring high availability and efficient resource utilization. By abstracting underlying infrastructure, Kubernetes simplifies the complexities of managing modern, distributed applications in various environments, including on-premises, public cloud, and hybrid setups.`;
  @Input() contentImageUrl?: string="assets/images/Kubernetes.png"; 

  likeCount = 0;
  isLiked = false;
  postDate: Date = new Date(); // Set to current date or your actual post date

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.likeCount = this.isLiked ? this.likeCount + 1 : this.likeCount - 1;
  }
  // Button click handlers
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