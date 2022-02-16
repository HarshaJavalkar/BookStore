import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      providers:[DataService, SpinnerService, PersistenceService],
      imports:[RouterTestingModule, HttpClientModule,ReactiveFormsModule,FormsModule ,ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
