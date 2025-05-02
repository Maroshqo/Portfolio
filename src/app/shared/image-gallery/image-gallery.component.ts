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
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  handleTouchEnd() {
    if (!this.isOpen || this.isAnimating) return;
    
    const swipeThreshold = 50; // Minimum distance to register as a swipe
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    if (swipeDistance > swipeThreshold) {
      // Swipe right -> previous image
      this.prev();
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe left -> next image
      this.next();
    }
    
    // Reset touch coordinates
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  // Close when clicking the backdrop (outside the image)
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
