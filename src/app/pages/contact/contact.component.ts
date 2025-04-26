import { Component } from '@angular/core';
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
export class ContactComponent {
  formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

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
