import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/home/shared/header/header/header.component';
import { FooterComponent } from './pages/home/shared/footer/footer/footer.component';
import { BookComponent } from './pages/book/book.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, BookComponent, RouterOutlet, LoginComponent, RegisterComponent, HomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isPaginaEspecial1: boolean = false;
  isPaginaEspecial2: boolean = false;
  isPaginaEspecial3: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPaginaEspecial1 = event.url === '/';
        this.isPaginaEspecial2 = event.url === '/register';
        this.isPaginaEspecial3 = event.url === '/buydone';
      }
    });
  }
}

