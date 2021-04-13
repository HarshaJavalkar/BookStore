import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { string } from 'joi';
import { DataService } from '../data.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
})
export class ThanksComponent implements OnInit {
  receivedAddress: string;
  constructor(private router: Router, private ds: DataService) {}

  ngOnInit(): void {}

  username = localStorage.getItem('username');

  backtoHome() {
    this.router.navigateByUrl(`/useraccount/${this.username}`);
  }
}
