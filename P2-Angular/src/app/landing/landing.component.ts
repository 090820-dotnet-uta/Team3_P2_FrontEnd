import { Component, Input, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { Preferences } from '../preferences';
import { Preference } from '../prefence';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentID: number;

  @Input('IDVal')
  set newID(newID: number) {
    this.currentID = newID;
  }

  lat: number;
  lng: number;
  city: string;
  radius = 16093.4;
  options = {
    componentRestrictions:{
      country:["US"]
    }
  }

  users$: Observable<User[]>;
  user: User;
  users: User[];
  filteredUsers: User[];
  clickedUsers: boolean[] = [];
  // currentID: number;
  editingForm: FormGroup;
  tempUser: User;
  preferencesSelected: Preference[] = new Array<Preference>();

  displayMap = true;
  displayFilters = false;
  displayLocations: boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private userService: UserService) {
  }

  ngOnInit(): void {
    // this.currentID = this.userService.getCurrentID();
    // alert(`${this.userService.getCurrentID()}`);
    // alert(`${this.userService.getCurrentID()}`);
    // this.currentID = parseInt(localStorage.getItem("currentID"));
    // if (this.currentID == 0)
    // {
    //   window.location.href = 'http://localhost:4200/login';
    // }
    // alert(`${this.currentID}`);

    // alert(this.currentID);

    this.clickedUsers = [];
    this.users$ = this.apiService.getUsers();
    this.apiService.getUsers().subscribe(users => this.users = users);
    for (let user in this.users)
    {
      this.clickedUsers.push(false);
    }
    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    // this.editingForm = this.fb.group({
    //   username: new ForfmControl('', [Validators.required]),
    //   email:    new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required]),
    //   city:     new FormControl('', [Validators.required])
    // });
    // this.editingForm = this.fb.group({
    //   username: ['', Validators.required],
    //   email: ['', Validators.email],
    //   password: ['', Validators.required],
    //   city: ['', Validators.required]
    // });
    this.editingForm = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        address: new FormControl(),
        radius: new FormControl()
      }
    );
  }

  setPreferencesSelected(userPreferences: Preferences){
    if(userPreferences.art == true){ let p = {type: "art", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "art", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.animals == true){ let p = {type: "animals", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "animals", clicked: false}; this.preferencesSelected.push(p); console.log(p.clicked)}

    if(userPreferences.nightlife == true){ let p = {type: "nightlife", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "nightlife", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.beauty == true){ let p = {type: "beauty", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "beauty", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.learning == true){ let p = {type: "learning", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "learning", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.entertainment == true){ let p = {type: "entertainment", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "entertainment", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.religion == true){ let p = {type: "religion", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "religion", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.shopping == true){ let p = {type: "shopping", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "shopping", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.homedecour == true){ let p = {type: "home decour", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "home decour", clicked: false}; this.preferencesSelected.push(p);}

    if(userPreferences.fitness == true){ let p = {type: "fitness", clicked: true}; this.preferencesSelected.push(p);}
    else{ let p = {type: "fitness", clicked: false}; this.preferencesSelected.push(p);}
  }

  onEdit() {
    const username = this.editingForm.get('username').value;
    const email = this.editingForm.get('email').value;
    const password = this.editingForm.get('password').value;
    const address = this.editingForm.get('address').value;
    let radius = this.editingForm.get('radius').value;
    if(radius == null){
      radius = 10;
    }
    if ((radius > 0 && radius <= 30)) {
      let animals = (<HTMLInputElement>document.getElementById("1")).checked;
      let art = (<HTMLInputElement>document.getElementById("2")).checked;
      let nightlife = (<HTMLInputElement>document.getElementById("3")).checked;
      let beauty = (<HTMLInputElement>document.getElementById("4")).checked;
      let learning = (<HTMLInputElement>document.getElementById("5")).checked;
      let entertainment = (<HTMLInputElement>document.getElementById("6")).checked;
      let religion = (<HTMLInputElement>document.getElementById("7")).checked;
      let shopping = (<HTMLInputElement>document.getElementById("8")).checked;
      let homedecour = (<HTMLInputElement>document.getElementById("9")).checked;
      let fitness = (<HTMLInputElement>document.getElementById("10")).checked;

      this.apiService.getUser(this.currentID).subscribe(user => this.user = user);

      if (username != null) { this.user.username = username; }
      if (email != null) { this.user.email = email; }
      if (password != null) { this.user.password = password; }
      if (address != null) { this.user.latitude = this.lat; }
      if (address != null) { this.user.longitude = this.lng; }
      if (address != null) { this.user.city = this.city; }
      if (radius != null) { (this.radius = radius / 0.00062137); }

      this.user.preferencesModel = { animals, art, nightlife, beauty, learning, entertainment, religion, shopping, homedecour, fitness };

      this.apiService.editUser(this.user).subscribe(user => this.user = user);
      this.EditUser();
      this.displayMap = true;
    }
    else{
    }
  }

  EditUser() {
    this.setPreferencesSelected(this.user.preferencesModel);
    if(this.displayMap == true){
      this.displayMap = false;
    } else{
      this.displayMap = true;
    }
    var x = document.getElementById("EditingForm");
    if (x.style.display === "none") {
      x.style.display = "block";
      (<HTMLInputElement> document.getElementById('username')).value = this.user.username;
      (<HTMLInputElement> document.getElementById('email')).value = this.user.email;
      (<HTMLInputElement> document.getElementById('password')).value = this.user.password;
      let r = this.radius*0.00062137;
      (<HTMLInputElement> document.getElementById('radius')).value = <string><unknown>(Math.ceil(r));
    } else {
      x.style.display = "none";
    }
  }

  DeleteUser(userID: number) {
    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    this.apiService.deleteUser(userID).subscribe(user => this.user = user);
    // localStorage.setItem("currentID", "0");
    this.currentID = 0;
    // window.location.href = 'http://localhost:4200/home';
  }

  handleClickedUser(userID: number) {
    this.clickedUsers[userID-1] = !this.clickedUsers[userID-1];
  }

  ShowLocationList() {
    this.displayLocations = !this.displayLocations;
  }

  ShowSimilarUsers(userID: number) {
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    this.filteredUsers = [];
    for(let i=0; i< this.users.length; i++)
    {
      // Animals, Art, Nightlife, Beauty, Learning, Entertainment, Religion, Shopping, HomeDecour, Fitness
      if ((((this.users[i].preferencesModel.animals == this.user.preferencesModel.animals) && (this.users[i].preferencesModel.animals == true)) ||
         ((this.users[i].preferencesModel.art == this.user.preferencesModel.art) && (this.users[i].preferencesModel.art == true)) ||
         ((this.users[i].preferencesModel.beauty == this.user.preferencesModel.beauty) && (this.users[i].preferencesModel.beauty == true)) ||
         ((this.users[i].preferencesModel.entertainment == this.user.preferencesModel.entertainment) && (this.users[i].preferencesModel.entertainment == true)) ||
         ((this.users[i].preferencesModel.fitness == this.user.preferencesModel.fitness) && (this.users[i].preferencesModel.fitness == true)) ||
         ((this.users[i].preferencesModel.homedecour == this.user.preferencesModel.homedecour) && (this.users[i].preferencesModel.homedecour == true)) ||
         ((this.users[i].preferencesModel.learning == this.user.preferencesModel.learning) && (this.users[i].preferencesModel.learning == true)) ||
         ((this.users[i].preferencesModel.nightlife == this.user.preferencesModel.nightlife) && (this.users[i].preferencesModel.nightlife == true)) ||
         ((this.users[i].preferencesModel.religion == this.user.preferencesModel.religion) && (this.users[i].preferencesModel.religion == true)) ||
         ((this.users[i].preferencesModel.shopping == this.user.preferencesModel.shopping) && (this.users[i].preferencesModel.shopping == true))) && (this.users[i].userId != this.currentID))
      {
        if (this.users[i].city == this.user.city)
        {
          this.filteredUsers.push(this.users[i]);
        }
      }
    }

    var x = document.getElementById("ShowUsersDisplay");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

public AddressChange(address: any) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.city = address.address_components[3].long_name;
    // console.log(address);
  }
}
