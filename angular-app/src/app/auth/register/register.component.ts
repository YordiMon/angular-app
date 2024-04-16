import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, RouterModule, HttpClientModule, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerObj: Register;
  isFormValid = true;

  constructor(private http: HttpClient, private router: Router) { 
    this.registerObj = new Register();
  }

  name: string = '';
  email: string = '';
  password: string = '';
  adress: string = '';

  ngOnInit(): void {

  }

  register() {
    const url = 'http://127.0.0.1:8000/api/register'; 
  
    this.http.post(url, this.registerObj).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error al realizar la petición:', error);
        this.isFormValid = false;
      }
    );
  }
}

export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.address = '';
  }
}
