import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { ExpectedConditions } from 'protractor';
import { Observable, observable, of } from 'rxjs';
import { Preferences } from '../preferences';
import { subscribeOn } from 'rxjs/operators';

describe('testing landing component', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let de: DebugElement;
  let api : ApiService;
  let serviceSpy: jasmine.SpyObj<ApiService>;
  let form : HTMLElement;
  const formBuilder: FormBuilder = new FormBuilder();
  let service: ApiService;
  let mockService: MockAPI;
  let spy: any;
  let http: HttpClient;

  class MockAPI extends ApiService {
    public getUser(){
      spyOn(component, 'EditUser').and.callThrough();
      let user: User;
      user.userId = 1;
      let obsUser: Observable<User>;
      obsUser.subscribe(user => user);
      return obsUser;
      }
    }



  beforeEach(async() => {
    TestBed.configureTestingModule({
    declarations: [LandingComponent],
    imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
    providers: [HttpClient, UserService, ApiService, { provide: ComponentFixtureAutoDetect, useValue: true }, { provide: FormBuilder, useValue: formBuilder } ],
  })
  .compileComponents();
  })

  beforeEach(() => {
    service = new ApiService(http);
    mockService = new MockAPI(http);
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
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

  it('onEdit spy is called', async() => {
    component.onEdit = jasmine.createSpy("onEdit spy");

    component.editingForm = formBuilder.group( {
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      radius: new FormControl('')
    });
    component.onEdit();
    expect(component.onEdit).toHaveBeenCalled();
  })
  });

describe('onEdit should be run', () =>{

  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let de: DebugElement;
  let api : ApiService;
  let serviceSpy: jasmine.SpyObj<ApiService>;
  let form : HTMLElement;
  const formBuilder: FormBuilder = new FormBuilder();
  let service: ApiService;
  let mockService: MockAPI;
  let spy: any;
  let http: HttpClient;
  let user: User;

  class MockAPI extends ApiService {

    public getUser(id: number){
      let obsUser: Observable<User>;
      let fakeUser: User;
      let fakePrefs: Preferences;
      fakePrefs = { preferencesId: 1, art: true, animals: false, nightlife: true, beauty: true, learning: true, entertainment: true, religion: true, shopping: true, homedecour: true, fitness: true};
      fakeUser = {userId: 1, username: 'a', email: 'a', password: 'a', latitude: 1, longitude: 1, city: 'a', preferencesModel: fakePrefs};
      return of(fakeUser);
      }
    public editUser(user: User){
        let obsUser: Observable<User>;
        let fakeUser: User;
        let fakePrefs: Preferences;
        fakePrefs = { preferencesId: 1, art: true, animals: false, nightlife: true, beauty: true, learning: true, entertainment: true, religion: true, shopping: true, homedecour: true, fitness: true};
        fakeUser = {userId: 1, username: 'a', email: 'a', password: 'a', latitude: 1, longitude: 1, city: 'a', preferencesModel: fakePrefs};
        return of(fakeUser);
      }
    public getUsers(){
      let obsUsers: Observable<User[]>;
      let fakeUsers: User[] = [];
      let fakeUser: User;
      let fakePrefs: Preferences;
      fakePrefs = { preferencesId: 1, art: true, animals: false, nightlife: true, beauty: true, learning: true, entertainment: true, religion: true, shopping: true, homedecour: true, fitness: true};
      fakeUser = {userId: 1, username: 'a', email: 'a', password: 'a', latitude: 1, longitude: 1, city: 'a', preferencesModel: fakePrefs};
      fakeUsers.push(fakeUser);
      return of(fakeUsers);
    }
    }

    beforeEach(async() => {
      TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
      providers: [HttpClient, UserService, {provide: ApiService, useClass: MockAPI}, { provide: ComponentFixtureAutoDetect, useValue: true }, { provide: FormBuilder, useValue: formBuilder } ],
    })
    .compileComponents();

    service = new ApiService(http);
    mockService = new MockAPI(http);
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    })

  it('onEdit should be run', () => {
    spyOn(component, 'EditUser').and.stub();
    component.editingForm = formBuilder.group( {
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      radius: new FormControl('')
    });
    component.onEdit();
    expect(component.EditUser).toHaveBeenCalled();

  })
})
