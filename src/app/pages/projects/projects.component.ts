import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

  // Sample project data - replace with your actual projects
  private projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description of project 1 and its features...',
      screenshots: [
        'assets/images/project1-screenshot1.jpg',
        'assets/images/project1-screenshot2.jpg'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Node.js']
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description of project 2 and its features...',
      screenshots: [
        'assets/images/project2-screenshot1.jpg',
        'assets/images/project2-screenshot2.jpg'
      ],
      technologies: ['React', 'JavaScript', 'CSS', 'Express']
    }
  ];

  showProjectDetails(projectId: number) {
    this.selectedProject = this.projects.find(p => p.id === projectId) || null;
  }

  closeProject() {
    this.selectedProject = null;
  }
}
