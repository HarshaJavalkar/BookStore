import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from '../data.service';

import { AddnewComponent } from './addnew.component';

describe('AddnewComponent', () => {
  let component: AddnewComponent;
  let fixture: ComponentFixture<AddnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewComponent ],
      providers:[DataService, PersistenceService],
      imports:[RouterTestingModule, HttpClientModule, ReactiveFormsModule,FormsModule, ToastrModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
