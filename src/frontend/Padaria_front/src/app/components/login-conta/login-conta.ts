import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-conta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-conta.html',
  styleUrl: './login-conta.css'
})
export class LoginConta {

  emailError: string = '';

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.emailError = '';
    } else if (!emailRegex.test(email)) {
      this.emailError = 'Enter valid email address';
    } else {
      this.emailError = '';
    }
  }
}
