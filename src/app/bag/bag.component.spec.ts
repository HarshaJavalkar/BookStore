import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from '../data.service';

import { BagComponent } from './bag.component';

describe('BagComponent', () => {
  let component: BagComponent;
  let fixture: ComponentFixture<BagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagComponent ],
      providers:[DataService, PersistenceService],
      imports:[RouterTestingModule, HttpClientModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
