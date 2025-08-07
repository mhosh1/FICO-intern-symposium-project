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
      createdBy: 'Mohamed',
      reviewedBy: 'Saul',
      team: 'Shell',
      title: 'What is Kubernetes?',
      content: '',
    },
    {
      id: 2,
      image: 'Product_02.jpg',
      createdBy: 'Brian',
      reviewedBy: 'Ruva',
      team: 'Shell',
      title: 'What is Docker?',
      content: '',
    },
    {
      id: 3,
      image: 'Product_03.jpg',
      createdBy: 'Mohamed',
      reviewedBy: 'Tyreese',
      team: 'Shell',
      title: 'What is GRPC?',
      content: '',
    },
    {
      id: 4,
      image: 'Product_04.jpg',
      createdBy: 'Sively',
      reviewedBy: 'Sively',
      team: 'Shell',
      title: 'What is SpringBoot?',
      content: '',
    },
    {
      id: 5,
      image: 'Product_05.jpg',
      createdBy: 'Arin',
      reviewedBy: 'Arin',
      team: 'Shell',
      title: 'What is Angular?',
      content: '',
    },
    {
      id: 6,
      image: 'Product_06.jpg',
      createdBy: 'Sadaq',
      reviewedBy: 'Sadaq',
      team: 'Shell',
      title: 'What is CI/CD?',
      content: '',
    },
    {
      id: 7,
      image: 'Product_07.jpg',
      createdBy: 'Mohamed',
      reviewedBy: 'Mohamed',
      team: 'Event Management',
      title: 'What is Java?',
      content: '',
    },
    {
      id: 8,
      image: 'Product_08.jpg',
      createdBy: 'Eduardo Service',
      reviewedBy: 'Eduardo Service',
      team: 'Cybersecurity',
      title: 'What is DevOps?',
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

