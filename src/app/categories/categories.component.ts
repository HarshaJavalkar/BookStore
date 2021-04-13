import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {}

  clickedExplore(cardClicked) {
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }
}
