import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { DataService } from '../data.service';

import { CorouselComponent } from './corousel.component';

describe('CorouselComponent', () => {
  let component: CorouselComponent;
  let fixture: ComponentFixture<CorouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorouselComponent ],
      providers:[DataService, PersistenceService],
      imports:[RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
