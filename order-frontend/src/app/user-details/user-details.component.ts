import { Component, OnInit } from '@angular/core';
import {MessageService} from "../services/message.service";
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users!: User[];
  constructor(private messageService: MessageService,
              private userService: UserService) { }
getUsers(): void{
    this.userService.getUsers()
      //users => this.users =Array.of(users)
      .subscribe(users => this.users = users);
}
  ngOnInit(): void {
    this.getUsers();
  }
}
