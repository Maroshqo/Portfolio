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
  touchStartY: number = 0;
  touchEndY: number = 0;
  touchStartTime: number = 0;
  touchEndTime: number = 0;
  isSwiping: boolean = false;
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
    // When the gallery is opened or the startIndex changes, update the current index
    if (changes['isOpen'] || changes['startIndex']) {
      // Only update the index when opening the gallery or when startIndex changes while open
      if ((changes['isOpen'] && this.isOpen) || 
          (changes['startIndex'] && this.isOpen)) {
        this.currentIndex = this.startIndex;
      }
    }
  }

  open(index: number = 0) {
    this.currentIndex = index;
  }

  close() {
    this.closeGallery.emit();
    // Reset animation states when closing
    this.isAnimating = false;
    this.swipeDirection = '';
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
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = new Date().getTime();
    this.isSwiping = false;
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
    this.touchEndY = event.touches[0].clientY;
    
    // Calculate horizontal and vertical movement
    const deltaX = Math.abs(this.touchEndX - this.touchStartX);
    const deltaY = Math.abs(this.touchEndY - this.touchStartY);
    
    // If horizontal movement is significant and greater than vertical movement,
    // consider it a swipe attempt
    if (deltaX > 10 && deltaX > deltaY) {
      this.isSwiping = true;
    }
  }

  handleTouchEnd() {
    if (!this.isOpen || this.isAnimating) return;
    
    this.touchEndTime = new Date().getTime();
    const touchDuration = this.touchEndTime - this.touchStartTime;
    const swipeThreshold = 50; // Minimum distance to register as a swipe
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    // Only process as a swipe if:
    // 1. We detected swiping behavior during the touch move
    // 2. The touch moved a significant horizontal distance (greater than threshold)
    if (this.isSwiping && Math.abs(swipeDistance) > swipeThreshold) {
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
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.touchStartTime = 0;
    this.touchEndTime = 0;
    this.isSwiping = false;
  }

  // Close when clicking the backdrop (outside the image)
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
