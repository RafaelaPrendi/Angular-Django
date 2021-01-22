import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: any;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

  signup(username: string, email: string, password1: string, password2: string) {
    this.authService.signup(username, email, password1, password2).subscribe(
      success => this.router.navigate(['customers']),
      error => this.error = error
    );
  }
}
