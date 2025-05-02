import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Visual feedback for copy operation
    const copyBtn = this.elementRef.nativeElement.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1200);
      });
    }
  }

  copyEmail() {
    navigator.clipboard.writeText('maros.vatascin@gmail.com');
  }

  onSubmit() {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', this.formData);
    // Reset form after submission
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}
