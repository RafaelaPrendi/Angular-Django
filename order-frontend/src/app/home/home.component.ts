import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    // this.profileService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }


}
