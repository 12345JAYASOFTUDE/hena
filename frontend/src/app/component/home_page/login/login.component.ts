import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm, Validators, NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoginFormVisible: boolean = true; // Ensure this is boolean

  @Output() close = new EventEmitter<void>();

  // Custom validator function
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.startsWith('no')) {
        return { invalidStart: true };
      }
      return null;
    };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Handle form submission
      console.log('Form Submitted', this.email, this.password);
      this.closeLoginForm(); // Close the form after submission
    }
  }

  closeLoginForm() {
    this.isLoginFormVisible = false; // Ensure this is boolean
    this.close.emit(); // Emit the event to notify the parent component
  }
}
