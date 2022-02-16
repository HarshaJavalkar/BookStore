import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from 'ngx-filter-pipe';
import { filter } from 'rxjs-compat/operator/filter';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

import { HomeComponent } from './home.component';

xdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,filter, BrowserDynamicTestingModule ],
      providers:[DataService, SpinnerService,PersistenceService],
      imports:[HttpClientModule, BrowserDynamicTestingModule, RouterTestingModule, Ng2SearchPipeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
