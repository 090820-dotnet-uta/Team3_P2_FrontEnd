import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';
import { UserService } from '../user.service';

import { LandingComponent } from './landing.component';

describe('testing landing component', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let de: DebugElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
    declarations: [LandingComponent],
    imports: [ReactiveFormsModule, HttpClientModule],
    providers: [HttpClient, UserService],
  })
  .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  })

  it('it should create', (done) => {
    component.ngOnInit();
    expect(component).toBeTruthy;
    done();
  })
});

