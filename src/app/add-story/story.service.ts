// story.service.ts
import { Injectable } from '@angular/core';

export interface Story {
  id?: number;
  image: string;
  createdBy: string;
  reviewedBy: string;
  team: string;
  content: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class StoryService {
  private stories: Story[] = [
    {
      id: 1,
      image: 'Product_01.jpg',
      createdBy: 'Arin Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 2,
      image: 'Product_02.jpg',
      createdBy: 'Brian Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 3,
      image: 'Product_03.jpg',
      createdBy: 'Mohamed Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 4,
      image: 'Product_04.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 5,
      image: 'Product_05.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 6,
      image: 'Product_06.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Shell',
      title: '',
      content: '',
    },
    {
      id: 7,
      image: 'Product_07.jpg',
      createdBy: 'Ana Stoneberg',
      reviewedBy: 'Jeff Service',
      team: 'Event Management',
      title: '',
      content: '',
    },
    {
      id: 8,
      image: 'Product_08.jpg',
      createdBy: 'Ana Steinberg',
      reviewedBy: 'Jeff Service',
      team: 'Cybersecurity',
      title: '',
      content: '',
    }
  ];

  getStories(): Story[] {
    return this.stories;
  }

  addStory(story: Story) {
    story.id = this.stories.length + 1;
    this.stories.unshift(story);
  }
}

