import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css'],
})
export class AdmindashComponent implements OnInit {
  constructor(private ar: ActivatedRoute) {}

  adminName: string;
  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
  }
}
