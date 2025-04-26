import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AITool {
  id: number;
  title: string;
  description: string;
  screenshots: string[];
  technologies: string[];
  aiFeatures: string[];
}

@Component({
  selector: 'app-ai-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-tools.component.html',
  styleUrls: ['./ai-tools.component.scss']
})
export class AiToolsComponent {
  selectedTool: AITool | null = null;

  // Sample AI tools data - replace with your actual AI integrations
  private aiTools: AITool[] = [
    {
      id: 1,
      title: 'AI Integration 1',
      description: 'Description of AI integration 1 and its features...',
      screenshots: [
        'assets/images/ai1-screenshot1.jpg',
        'assets/images/ai1-screenshot2.jpg'
      ],
      technologies: ['TensorFlow', 'Python', 'OpenAI API', 'Flask'],
      aiFeatures: [
        'Natural Language Processing',
        'Image Recognition',
        'Real-time Analysis'
      ]
    },
    {
      id: 2,
      title: 'AI Integration 2',
      description: 'Description of AI integration 2 and its features...',
      screenshots: [
        'assets/images/ai2-screenshot1.jpg',
        'assets/images/ai2-screenshot2.jpg'
      ],
      technologies: ['PyTorch', 'FastAPI', 'Hugging Face', 'Docker'],
      aiFeatures: [
        'Machine Learning Pipeline',
        'Text Generation',
        'Automated Decision Making'
      ]
    }
  ];

  showToolDetails(toolId: number) {
    this.selectedTool = this.aiTools.find(t => t.id === toolId) || null;
  }

  closeTool() {
    this.selectedTool = null;
  }
}
