import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';

interface Project {
  id: number;
  title: string;
  description: string;
  screenshots: string[];
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectedProject: Project | null = null;
  galleryOpen: boolean = false;
  galleryImages: string[] = [];
  galleryIndex: number = 0;
  
  // Sample project data - replace with your actual projects
  private projects: Project[] = [
    {
      id: 1,
      title: 'Solar Energy Monitoring',
      description: 'A comprehensive solar energy monitoring system that tracks performance, generates reports, and provides real-time analytics for solar installations.',
      screenshots: [
        'assets/images/Solar1.png',
        'assets/images/Solar2.png',
        'assets/images/Solar3.png',
        'assets/images/Solar4.png',
        'assets/images/Solar5.png',
        'assets/images/Solar6.png',
        'assets/images/TrendAlerts.jpeg'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Node.js', 'Chart.js', 'RESTful APIs']
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description of project 2 and its features...',
      screenshots: [
        'assets/images/TrendAlerts.jpeg'
      ],
      technologies: ['React', 'JavaScript', 'CSS', 'Express']
    }
  ];

  ngOnInit() {
    // Pre-select the first project
    this.showProjectDetails(1);
  }

  showProjectDetails(projectId: number) {
    this.selectedProject = this.projects.find(p => p.id === projectId) || null;
  }

  closeProject() {
    this.selectedProject = null;
  }
  
  openGallery(images: string[], index: number = 0) {
    this.galleryImages = images;
    this.galleryIndex = index;
    this.galleryOpen = true;
  }
  
  closeGallery() {
    this.galleryOpen = false;
  }
}
