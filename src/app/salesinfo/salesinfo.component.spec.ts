import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../data.service';

import { SalesinfoComponent } from './salesinfo.component';

describe('SalesinfoComponent', () => {
  let component: SalesinfoComponent;
  let fixture: ComponentFixture<SalesinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesinfoComponent ],
      providers:[DataService],
      imports:[RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
