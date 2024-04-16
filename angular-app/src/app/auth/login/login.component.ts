import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, RouterOutlet, RouterModule, HttpClientModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginObj: Login;
  isInvCred: boolean = false;
  isNameFilled: boolean = true;
  isPasswordFilled: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  ngOnInit(): void {}

  login() {
    const url = 'http://127.0.0.1:8000/api/login';

    this.http.post(url, this.loginObj).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor: ', response);

        if (response.message == 'success') {
          this.router.navigate(['/home'])

          // Almacenar la información del usuario en LocalStorage
          localStorage.setItem('profileId', response.profile.id);
          localStorage.setItem('profileName', response.profile.name)
          localStorage.setItem('profileEmail', response.profile.email)
          localStorage.setItem('profileAddress', response.profile.address)
        } else if (response.message == 'error.') {
          this.isInvCred = true;
          this.isNameFilled = true;
          this.isPasswordFilled = true; 
        }
      },
      (error: any) => {
        console.error('Hubo un error: ', error)
        this.isInvCred = false;

        if (this.loginObj.name == '') {
          this.isNameFilled = false;
        } else {
          this.isNameFilled = true;   
        }
        
        if (this.loginObj.password == '') {
          this.isPasswordFilled = false;
        } else {
          this.isPasswordFilled = true;
        }
      }
    )
  }
}

export class Login {
  name: string = '';
  password: string = '';
  constructor() {
    this.name = '';
    this.password = '';
  }
}