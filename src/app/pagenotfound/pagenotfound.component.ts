import { Component, OnInit } from '@angular/core';
import { PersistenceService } from 'angular-persistence';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent implements OnInit {
  public errors: any = [];
  constructor(private persistenceService: PersistenceService) {}

  ngOnInit(): void {
    this.errors = this.persistenceService.get('ERRORS');
  }
}
