import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Only needed if you use http in component
@Component({
 selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

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

  roles = [
    'Software Engineer Intern',
    'Data Science Intern', 
    'Cybersecurity Intern',
    'Product Management Intern',
    'UI/UX Design Intern',
    'DevOps Intern',
    'Other'
  ];

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      team: ['', Validators.required],
      role: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

   /* ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }*/

  // Password validator
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /\d/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { passwordStrength: true };
  }

  // Password match validator
  passwordMatchValidator(form: AbstractControl): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

 
 // signup.component.ts
// signup.component.ts
onSubmit(): void {
  if (this.signupForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.signupForm.value;

    // First check username
    this.userService.usernameExists(formData.username).subscribe({
      next: (usernameTaken) => {
        if (usernameTaken) {
          this.handleError('Username already exists!');
          return;
        }

        // Then check email
        this.userService.emailExists(formData.email).subscribe({
          next: (emailTaken) => {
            if (emailTaken) {
              this.handleError('Email already exists!');
              return;
            }

            // If both checks pass, register user
            this.registerUser(formData);
          },
          error: () => this.handleError('Error checking email availability')
        });
      },
      error: () => this.handleError('Error checking username availability')
    });
  }
}

private registerUser(userData: any): void {
  this.userService.addUser(userData).subscribe({
    next: () => {
      this.successMessage = 'Registration successful!';
      setTimeout(() => {
        this.signupForm.reset();
        this.router.navigate(['/login']);
      }, 2000);
    },
    error: () => this.handleError('Registration failed. Please try again.'),
    complete: () => this.isLoading = false
  });
}

private handleError(message: string): void {
  this.errorMessage = message;
  this.isLoading = false;
}


  // Error message helper
  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required.`;
      if (field.errors['email']) return 'Please enter a valid email address.';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['maxlength']) return `${this.getFieldDisplayName(fieldName)} must be no more than ${field.errors['maxlength'].requiredLength} characters.`;
      if (field.errors['passwordStrength']) return 'Password must include uppercase, lowercase, number, and special character.';
    }
    return '';
  }

  // Form-level error message
  getFormError(): string {
    if (this.signupForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    }
    return '';
  }

  // Helper for display names
  private getFieldDisplayName(fieldName: string): string {
    const names: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      team: 'Team',
      role: 'Role'
    };
    return names[fieldName] || fieldName;
  }
}