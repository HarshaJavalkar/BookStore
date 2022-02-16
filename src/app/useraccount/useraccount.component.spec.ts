import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../data.service';

import { UseraccountComponent } from './useraccount.component';

describe('UseraccountComponent', () => {
  let component: UseraccountComponent;
  let fixture: ComponentFixture<UseraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraccountComponent ],
      providers:[DataService],
      imports:[RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
