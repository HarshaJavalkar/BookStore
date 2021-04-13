import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css'],
})
export class CorouselComponent implements OnInit {
  constructor(private router: Router) {}

  clickedExplore(cardClicked) {
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }

  ngOnInit(): void {}
}
