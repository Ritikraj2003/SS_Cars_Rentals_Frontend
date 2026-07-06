import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  images: string[] = [];
  currentImageIndex = 0;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.images = Array.from({ length: 10 }, (_, i) => `assets/login-images/car${i + 1}.jpg`);

    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 4000);
  }

  onSubmit(username: string, password: string): void {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginData = { username, password };
    this.api.login(loginData).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('jwtToken', response.token);
        sessionStorage.setItem('Name',username)
        this.router.navigate(['/admin/dashboard']);
      }
    });
  }
}
