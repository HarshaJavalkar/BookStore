import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  display: boolean
  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.loadingStatus.subscribe(val=>{
      this.display = val;
    })
  }

}
