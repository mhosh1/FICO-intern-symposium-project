// login.component.ts - COMPLETE WORKING VERSION
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Add this
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule, RouterModule], // Add these imports for standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Teams available at FICO (based on your team info)
  teams = [
    'Shell',
    'Cybersecurity', 
    'Event Management',
    'Analytic Science',
    'Global Solution Architect',
    'Digital Learning',
    'Database Management',
    'Other'
  ];

  // Roles available
  roles = [
    'Software Engineer Intern',
    'Data Science Intern', 
    'Cybersecurity Intern',
    'Product Management Intern',
    'UI/UX Design Intern',
    'DevOps Intern',
    'Other'
  ];

  constructor(private fb: FormBuilder) {
    // Create the form in constructor
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
     
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  // Custom password validator
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    if (!valid) {
      return { 'passwordStrength': true };
    }
    return null;
  }


  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // MOCK SUBMISSION - just for testing the UI
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! (This is just a test)';
        console.log('Form data:', this.loginForm.value);
      }, 2000);
      
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper methods for template
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required.`;
      if (field.errors['email']) return 'Please enter a valid email address.';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['maxlength']) return `${this.getFieldDisplayName(fieldName)} must be no more than ${field.errors['maxlength'].requiredLength} characters.`;
      if (field.errors['passwordStrength']) return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    return '';
  }

  getFormError(): string {
    if (this.loginForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'firstName': 'First name',
      'lastName': 'Last name',
      'email': 'Email',
      'username': 'Username',
      'password': 'Password',
      'confirmPassword': 'Confirm password',
      'team': 'Team',
      'role': 'Role'
    };
    return displayNames[fieldName] || fieldName;
  }
}