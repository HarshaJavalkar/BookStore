import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../data.service';

import { PremiumComponent } from './premium.component';

describe('PremiumComponent', () => {
  let component: PremiumComponent;
  let fixture: ComponentFixture<PremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumComponent ],
      providers:[DataService],
      imports:[RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
