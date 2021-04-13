import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css'],
})
export class UserdashComponent implements OnInit, OnDestroy {
  username: any;
  subscription: Subscription;

  constructor(private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.ar.paramMap.subscribe((data) => {
      this.username = data['params'].username;

      console.log(this.username);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
