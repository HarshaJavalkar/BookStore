import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
public loadingStatus:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor() { }
  displayLoad(value:boolean){
    window.navigator.vibrate(300);
    this.loadingStatus.next(value)
    }
    
}
