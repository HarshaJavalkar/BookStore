import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})
export class AdminprofileComponent implements OnInit {
  username: string;
  constructor() {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {}
}
