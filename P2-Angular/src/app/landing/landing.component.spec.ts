import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { ExpectedConditions } from 'protractor';
import { Observable, observable } from 'rxjs';

describe('testing landing component', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let de: DebugElement;
  let api : ApiService;
  let serviceSpy: jasmine.SpyObj<ApiService>;
  let form : HTMLElement;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async() => {
    TestBed.configureTestingModule({
    declarations: [LandingComponent],
    imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
    providers: [HttpClient, UserService, ApiService,{ provide: ComponentFixtureAutoDetect, useValue: true }, { provide: FormBuilder, useValue: formBuilder } ],
  })
  .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    serviceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;


  })

  it('it should create', (done) => {
    expect(component).toBeTruthy;
    done();
  })

  it('form should be empty', async() => {

    form = fixture.nativeElement.querySelector('EditingForm');

    expect(form).toBeDefined();
  })

  it('EditUser is called', async() => {
    component.ngOnInit();
    component.editingForm = formBuilder.group({
      username: 'a',
      password: 'a',
      email: 'a'
    })
    let x = true;
    try{
    component.EditUser();
    }
    catch(error)
    {
      x : false;
    };
    expect(component.EditUser()).toBeUndefined();
    expect(x).toBeFalse;
  })
});

