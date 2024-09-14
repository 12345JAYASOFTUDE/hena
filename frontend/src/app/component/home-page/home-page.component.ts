import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../home_page/login/login.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isLoginFormVisible = false;

  toggleLoginForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  closeLoginForm() {
    this.isLoginFormVisible = false;
  }
}
