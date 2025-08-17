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

  // AI Tools Data
  private aiTools: AITool[] = [
    {
      id: 1,
      title: 'AI/ML-Powered Speech-to-Text Transcription',
      description: 'AI/Machine Learning-powered Python CLI script built on OpenAI\'s Whisper neural networks and Faster-Whisper that transcribes audio/video with multi-language support, tracks multiple speakers, and maps each sentence to a Person ID (Person1, Person2, …) with a timestamp, producing diarized transcripts.\n\nFeatures include:\n• Hybrid diarization (ECAPA embeddings + K-Means + Viterbi)\n• Optional pyannote fallback\n• Progress bar with ETA\n• Language auto-detection or manual selection\n• Auto/fixed choices for engine, transcription language, and speaker count',
      screenshots: [
        'assets/images/Transcription2/1.png',
        'assets/images/Transcription2/2.png',
        'assets/images/Transcription2/3a.png',
        'assets/images/Transcription2/3b.png',
        'assets/images/Transcription2/4.png',
        'assets/images/Transcription2/5.png',
        'assets/images/Transcription2/all at once.png'
      ],
      technologies: [
        '🐍 Python 3.13 - Core language with rich ecosystem for AI/ML development',
        '🎙️ Faster-Whisper - Efficient speech recognition engine for fast, accurate transcriptions',
        '🔊 SpeechBrain ECAPA-TDNN - State-of-the-art speaker embedding model for diarization',
        '🤗 Hugging Face Hub - Model management and offline caching',
        '📊 scikit-learn - KMeans clustering and model selection metrics',
        '🎛️ FFmpeg - Audio processing and format conversion',
        '📈 librosa - Advanced audio feature extraction (MFCC, spectral, pitch)'
      ],
      aiFeatures: [
        'Automatic Speaker Diarization - Identifies and labels different speakers',
        'Smart Speaker Count - Automatically determines optimal number of speakers',
        'Frame-wise Analysis - Stable speaker labels even for short phrases',
        'Multi-language Support - Automatic language detection or manual selection',
        'Temporal Smoothing - Viterbi algorithm for consistent speaker labeling',
        'Offline-First - Full functionality without internet after initial setup',
        'Progress Tracking - Real-time ETA and processing status'
      ]
    },
    {
      id: 2,
      title: 'AI Navigator ChatBot',
      description: 'A smart AI assistant integrated into a Healthcare web application built with the Angular framework. The AI Navigator ChatBot is connected to the OpenAI platform via API and provides instant responses based on custom internal documentation. It helps users navigate complex medical features directly through chat, improving accessibility, efficiency, and user experience within the system.',
      screenshots: [
        'assets/gifs/AI-Navigator%20ChatBot.gif'
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'OpenAI API', 'RxJS', 'HTML/CSS', 'REST API'],
      aiFeatures: [
        'Natural language understanding using OpenAI GPT',
        'Context-aware responses based on custom healthcare documentation',
        'Smart navigation guidance through chat (e.g., directing users to specific sections of the app)',
        'Instant, human-like replies to improve support efficiency',
        'Introductory and follow-up messaging to enhance user engagement',
        'Typing indicator animation during AI processing'
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
