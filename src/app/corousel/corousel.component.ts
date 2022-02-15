import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css'],
})
export class CorouselComponent implements OnInit {
  constructor(private router: Router,private spinner: SpinnerService ) {}
  clickedExplore(cardClicked) {
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }

  ngOnInit(): void {}
}
