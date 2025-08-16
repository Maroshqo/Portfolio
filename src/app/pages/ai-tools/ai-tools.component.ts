import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';

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
  imports: [CommonModule, ImageGalleryComponent],
  templateUrl: './ai-tools.component.html',
  styleUrls: ['./ai-tools.component.scss']
})
export class AiToolsComponent implements OnInit {
  selectedTool: AITool | null = null;
  galleryOpen: boolean = false;
  galleryImages: string[] = [];
  galleryIndex: number = 0;

  // Sample AI tools data - replace with your actual AI integrations
  private aiTools: AITool[] = [
    {
      id: 1,
      title: 'ML Speech Transcription & Translation',
      description: 'A Python-based offline speech recognition solution powered by OpenAI\'s Whisper Machine Learning model. This tool transcribes spoken audio from MP3 files into written text (Slovak or any language) with optional translation to English. The system uses Whisper\'s neural network models (tiny, small, or medium) that run entirely offline after download, ensuring complete data privacy. Features include automatic language detection, live progress tracking with percentage and ETA, and comprehensive timing logs. The final transcription is saved as a .txt file, with the entire process running locally on your CPU.',
      screenshots: [
        'assets/images/Transcription/transcription1.png',
        'assets/images/Transcription/transcription2.png'
      ],
      technologies: [
        '🐍 Python 3 - Main programming language with rich ecosystem for files, subprocesses, and AI models',
        '🎙️ OpenAI Whisper - Pre-trained deep ML neural network model for speech-to-text, language detection, and translation',
        '🎧 FFmpeg - Command-line tool for audio analysis, conversion, and decoding in Whisper\'s required format',
        '📊 tqdm - Python library for elegant terminal progress bars showing percentage, elapsed time, and ETA',
        '🧠 Python Standard Libraries - datetime, time, subprocess, warnings for timing and process management'
      ],
      aiFeatures: [
        'Speech-to-Text Transcription with Neural Network Processing',
        'Automatic Language Detection for Multi-Language Support',
        'Optional Translation to English (task="translate")',
        'Multiple Model Sizes (tiny, small, medium) for Performance Tuning',
        'Live Progress Tracking with Percentage, Elapsed Time, and ETA',
        'Complete Data Privacy (100% Offline Processing)',
        'MP3 to Text (.txt) Conversion with Timing Logs'
      ]
    },
    {
      id: 2,
      title: 'AI Navigator Chat Button Kit',
      description: 'An interactive chatbot system that provides intelligent navigation assistance through natural language. Users can ask questions, get recommendations, and perform actions through a conversational interface powered by advanced AI models.',
      screenshots: [
        'assets/gifs/AI-Navigator%20ChatBot.gif'
      ],
      technologies: ['TensorFlow', 'Python', 'OpenAI API', 'Flask', 'WebSockets'],
      aiFeatures: [
        'Natural Language Processing',
        'Contextual Understanding',
        'Real-time Response Generation',
        'User Intent Recognition'
      ]
    }
  ];

  ngOnInit() {
    // Pre-select the first AI tool
    this.showToolDetails(1);
  }

  showToolDetails(toolId: number) {
    this.selectedTool = this.aiTools.find(t => t.id === toolId) || null;
  }

  closeTool() {
    this.selectedTool = null;
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
