import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css'],
})
export class BiographyComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}
  biographyBooksFromdb;

  ngOnInit(): void {}
}
