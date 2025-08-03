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
  @Input() title: string = 'What is Lorem Ipsum?';
  @Input() author: string = 'By classic_books';
  @Input() content: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            It has survived rnot odddddddnly five centuries, but also the leap into electronic typesetting.`;


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