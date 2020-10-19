import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { Preferences } from '../preferences';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Output() currentIDEvent = new EventEmitter<number>();
  @Output() registeredEvent = new EventEmitter<number>();

  id: number;
  name: string;
  email: string;
  password: string;
  register: FormGroup;
  user: User;
  passedUser: User;
  users: User[];
  preferences: Preferences;
  animals: boolean;
  art: boolean;
  nightlife: boolean;
  beauty: boolean;
  learning: boolean;
  entertainment: boolean;
  religion: boolean;
  shopping: boolean;
  homedecour: boolean;
  fitness: boolean;
  registerSubmitted: boolean = false;
  takenEmailFlag: boolean = false;
  takenEmailString: string = '';

  lat: number;
  lng: number;
  options = {
    componentRestrictions:{
      country:["US"]
    }
  }
  address: any;
  addressIsValid: boolean;
  addressClicked: string;

  constructor(private apiService: ApiService, private userService: UserService, private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    // alert(`${this.userService.getCurrentID()}`);
    //localStorage.getItem("currentEmail");
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.register = this.fb.group({
      username:       new FormControl('', [Validators.required]),
      email:          new FormControl('', [Validators.required, Validators.email]),
      password:       new FormControl('', [Validators.required]),
      city:           new FormControl(''),
      animals:        [''],
      art:            [''],
      nightlife:      [''],
      beauty:         [''],
      learning:       [''],
      entertainment:  [''],
      religion:       [''],
      shopping:       [''],
      homedecour:     [''],
      fitness:        ['']
    });

    // this.register = new FormGroup(
    //   {
    //     username: new FormControl(),
    //     email: new FormControl(),
    //     password: new FormControl(),
    //     city: new FormControl(),
    //     // preferencesId: new FormControl()
    //     animals: new FormControl(),
    //     art: new FormControl(),
    //     nightlife: new FormControl(),
    //     beauty: new FormControl(),
    //     learning: new FormControl(),
    //     entertainment: new FormControl(),
    //     religion: new FormControl(),
    //     shopping: new FormControl(),
    //     homedecour: new FormControl(),
    //     fitness: new FormControl()
    //   }
    // );
  }
  public AddressChange(address: any) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.address = address;
    if((address.address_components.length == 9 || address.address_components.length == 8) &&
      (<HTMLInputElement> document.getElementById("address")).value != ""){
      for (let index = 0; index<address.address_components.length; index++){
        // Street Num
        if(address.address_components[index].types[0] == "street_number"){
          this.addressClicked = address.address_components[index].long_name + " ";
        }
        // Street Name
        else if(address.address_components[index].types[0] == "route"){
          this.addressClicked += address.address_components[index].long_name + ", ";
        }
        // City
        else if(address.address_components[index].types[0] == "locality"){
          if(address.address_components[index - 1].types[0] == "neighborhood"){
            this.addressClicked += address.address_components[index - 1].long_name + ", ";
          }
          else{
            this.addressClicked += address.address_components[index].long_name + ", ";
          }
        }
        // State
        else if(address.address_components[index].types[0] == "administrative_area_level_1"){
          this.addressClicked += address.address_components[index].short_name + ", ";
        }
      }
      this.addressClicked += "USA";
      this.addressIsValid = true;
    }
    else{
      this.addressIsValid = false;
    }

    console.log("App Component LAT is:" + this.lat);
    console.log("App Component LNG is:" + this.lng);
    console.log("Addrress is valid is: " + this.addressIsValid);
    console.log(address);
  }

  onRegister() {
    this.registerSubmitted = true;
    let username = this.register.get('username').value;
    let email = this.register.get('email').value;
    let password = this.register.get('password').value;
    let city = this.address.address_components[3].long_name;
    let latitude = this.address.geometry.location.lat();
    let longitude = this.address.geometry.location.lng();

    console.log("GetElementByID: " + (<HTMLInputElement> document.getElementById("address")).value);
    console.log("AddressClicked: " + this.addressClicked)

    let animals = (<HTMLInputElement> document.getElementById("1")).checked;
    let art = (<HTMLInputElement> document.getElementById("2")).checked;
    let nightlife = (<HTMLInputElement> document.getElementById("3")).checked;
    let beauty = (<HTMLInputElement> document.getElementById("4")).checked;
    let learning = (<HTMLInputElement> document.getElementById("5")).checked;
    let entertainment = (<HTMLInputElement> document.getElementById("6")).checked;
    let religion = (<HTMLInputElement> document.getElementById("7")).checked;
    let shopping = (<HTMLInputElement> document.getElementById("8")).checked;
    let homedecour = (<HTMLInputElement> document.getElementById("9")).checked;
    let fitness = (<HTMLInputElement> document.getElementById("10")).checked;

    this.preferences = {animals, art, nightlife, beauty, learning, entertainment, religion, shopping, homedecour, fitness};
    this.passedUser = { username: username, email: email, password: password, city: city, latitude: latitude, longitude: longitude, preferencesModel: this.preferences}

    this.takenEmailFlag = false;
    this.takenEmailString = '';
    for(let i=0; i< this.users.length; i++)
    {
      if (this.users[i].email == email)
      {
        this.takenEmailFlag = true;
        this.takenEmailString = email;
      }
    }

    if (!this.takenEmailFlag && this.register.valid && this.addressIsValid && this.addressClicked == (<HTMLInputElement> document.getElementById("address")).value)
    {
      this.registerSubmitted = false;
      this.apiService.createUser(this.passedUser).subscribe(user => this.user = user);
      this.registeredEvent.emit(1);
    }

    // try {
    //   this.currentIDEvent.emit(this.users[this.users.length-1].userId + 1);
    // }
    // catch (e) {
    //   console.log(e);
    //   this.currentIDEvent.emit(1);
    // }

    // this.registeredEvent.emit(1);
    // localStorage.setItem("currentID", (this.users[this.users.length-1].userId + 1).toString());
    // window.location.href = 'http://localhost:4200/landing';
  }
}
