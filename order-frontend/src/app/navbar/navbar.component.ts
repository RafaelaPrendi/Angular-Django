import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title!: string;
  isLoggedIn = false;
  isAdmin = false;
  currentUser!: User;
  group: any;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userService.getUserInfo().subscribe(response => {
          this.currentUser = response;
          this.group = this.currentUser.group_names.pop();
        },
        error => console.log(error));
    }
  }


  logout() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['home']);
    }
  }

}
