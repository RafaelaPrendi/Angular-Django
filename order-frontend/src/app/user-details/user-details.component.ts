import { Component, OnInit } from '@angular/core';
import {MessageService} from "../services/message.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Username", "Email", "Groups"];

  users!: User[];
  constructor(private messageService: MessageService,
              private userService: UserService) { }
getUsers(): void{
    this.userService.getUsers()
      .subscribe(users => this.users = users);
}
  ngOnInit(): void {
    this.getUsers();
  }
}
