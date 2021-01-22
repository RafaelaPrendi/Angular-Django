import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
