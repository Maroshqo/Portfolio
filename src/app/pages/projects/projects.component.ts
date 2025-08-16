import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageGalleryComponent} from '../../shared/image-gallery/image-gallery.component';

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
      description: 'Headquartered in San Diego, California, USA, Solar Turbines Incorporated, a subsidiary of Caterpillar Inc., is one of the world\'s leading ' +
        'manufacturers of industrial gas turbines, with more than 15,000 units and over 2 billion operating hours in over 100 countries.',
      screenshots: [
        'assets/images/Solar/Solar1.png',
        'assets/images/Solar/Solar2.png',
        'assets/images/Solar/Solar3.png',
        'assets/images/Solar/Solar4.png',
        'assets/images/Solar/Solar5.png',
        'assets/images/Solar/Solar6.png',
        'assets/images/Solar/TrendAlerts.jpeg'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Highcharts', 'RESTful APIs']
    },
    {
      id: 2,
      title: 'Impulse Mobile App',
      description: 'A comprehensive mobile application for managing finances, tracking repairs, and navigating locations. The app features a responsive design that works across multiple devices and includes interactive maps and financial tracking tools.',
      screenshots: [
        'assets/images/Impulse/1-global-1.png',
        'assets/images/Impulse/2-repair-2.png',
        'assets/images/Impulse/3-cards-finance-1.png',
        'assets/images/Impulse/4-mobile-2.png',
        'assets/images/Impulse/5-map-1.png'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Google Maps API', 'RESTful APIs']
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
