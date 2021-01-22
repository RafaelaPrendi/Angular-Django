import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Username", "FirstName", "LastName", "Email", "Action"];
  users!: User[];

  constructor(private messageService: MessageService,
              private userService: UserService,
              private router: Router) {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users);
      }, error => console.log(error));
  }

  ngOnInit(): void {
    this.getUsers();
  }

  add(): void {
    this.router.navigate(['/users/create'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  edit(user: User): void {
    this.router.navigate([`users/${user.id}`]);
  }

  delete(user: User): void {
    this.userService.delete(user.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/users'])
          .then(success => console.log('navigation success?', success))
          .catch(console.error);
      },
      error => {
        console.log(error);
      }
    );
  }
}
