import { Component, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnChanges {
  @Input() images: string[] = [];
  @Input() isOpen: boolean = false;
  @Input() startIndex: number = 0;
  @Output() closeGallery = new EventEmitter<void>();

  currentIndex: number = 0;
  touchStartX: number = 0;
  touchEndX: number = 0;
  touchStartTime: number = 0;
  touchEndTime: number = 0;
  isAnimating: boolean = false;
  swipeDirection: string = '';

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.close();
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  @HostListener('document:keydown.arrowdown', ['$event'])
  handleNextImage(event: KeyboardEvent) {
    if (this.isOpen) {
      this.next();
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  @HostListener('document:keydown.arrowup', ['$event'])
  handlePrevImage(event: KeyboardEvent) {
    if (this.isOpen) {
      this.prev();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen && changes['startIndex']) {
      this.currentIndex = this.startIndex;
    }
  }

  open(index: number = 0) {
    this.currentIndex = index;
  }

  close() {
    this.closeGallery.emit();
  }

  next() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.swipeDirection = 'left';
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.isAnimating = false;
      this.swipeDirection = '';
    }, 300); // Match this with the CSS animation duration
  }

  prev() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.swipeDirection = 'right';
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.isAnimating = false;
      this.swipeDirection = '';
    }, 300); // Match this with the CSS animation duration
  }

  // Touch event handlers for mobile swipe
  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartTime = new Date().getTime();
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  handleTouchEnd() {
    if (!this.isOpen || this.isAnimating) return;
    
    this.touchEndTime = new Date().getTime();
    const touchDuration = this.touchEndTime - this.touchStartTime;
    const swipeThreshold = 50; // Minimum distance to register as a swipe
    const swipeDistance = this.touchEndX - this.touchStartX;
    const maxTapDuration = 300; // Maximum duration for a tap in milliseconds
    
    // Only process as a swipe if:
    // 1. The touch moved a significant distance (greater than threshold)
    // 2. It's not just a tap (either moved enough or took longer than a tap)
    if (Math.abs(swipeDistance) > swipeThreshold && 
        (Math.abs(swipeDistance) > 10 || touchDuration > maxTapDuration)) {
      if (swipeDistance > 0) {
        // Swipe right -> previous image
        this.prev();
      } else {
        // Swipe left -> next image
        this.next();
      }
    }
    
    // Reset touch coordinates and times
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartTime = 0;
    this.touchEndTime = 0;
  }

  // Close when clicking the backdrop (outside the image)
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
