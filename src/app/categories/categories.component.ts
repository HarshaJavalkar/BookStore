import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private ds: DataService, private router: Router, private persistence: PersistenceService) {}

  ngOnInit(): void {}

  clickedExplore(cardClicked) {
    this.persistence.set('CARD_CLICKED',cardClicked, {type: StorageType.SESSION});
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }
}
