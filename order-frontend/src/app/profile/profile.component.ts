import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  groups: any;

  constructor(private token: TokenStorageService, private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.token.getUser();
    //this.currentUser = localStorage.getItem('currentUser');
    // this.currentUser = this.authService.getUsername();

    // console.log(this.currentUser);

    this.userService.getUserInfo().subscribe(response => {
        this.currentUser = response;
        console.log(this.currentUser);
        this.groups = this.currentUser.group_names
      },
      error => {
        console.log(error);
      });
  }

}
