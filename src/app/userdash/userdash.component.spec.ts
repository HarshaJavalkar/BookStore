import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserdashComponent } from './userdash.component';

describe('UserdashComponent', () => {
  let component: UserdashComponent;
  let fixture: ComponentFixture<UserdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdashComponent ],
      imports:[HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
