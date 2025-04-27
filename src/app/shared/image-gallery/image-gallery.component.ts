import { Component, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges } from '@angular/core';
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
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Close when clicking the backdrop (outside the image)
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
