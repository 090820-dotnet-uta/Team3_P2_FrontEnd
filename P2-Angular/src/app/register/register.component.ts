import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @Output() currentIDEvent = new EventEmitter<number>();
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

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    // alert(`${this.userService.getCurrentID()}`);
    //localStorage.getItem("currentEmail");
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.register = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        // preferencesId: new FormControl()
        animals: new FormControl(),
        art: new FormControl(),
        nightlife: new FormControl(),
        beauty: new FormControl(),
        learning: new FormControl(),
        entertainment: new FormControl(),
        religion: new FormControl(),
        shopping: new FormControl(),
        homedecour: new FormControl(),
        fitness: new FormControl()
      }
    );
  }

  onRegister() {
    let username = this.register.get('username').value;
    let email = this.register.get('email').value;
    let password = this.register.get('password').value;

    let animals = this.register.get('animals').value;
    let art = this.register.get('art').value;
    let nightlife = this.register.get('nightlife').value;
    let beauty = this.register.get('beauty').value;
    let learning = this.register.get('learning').value;
    let entertainment = this.register.get('entertainment').value;
    let religion = this.register.get('religion').value;
    let shopping = this.register.get('shopping').value;
    let homedecour = this.register.get('homedecour').value;
    let fitness = this.register.get('fitness').value;

    this.preferences = {animals, art, nightlife, beauty, learning, entertainment, religion, shopping, homedecour, fitness};
    this.passedUser = { username: username, email: email, password: password, preferences: this.preferences}

    this.apiService.createUser(this.passedUser)
      .subscribe(user => this.user = user);
    try {
      this.currentIDEvent.emit(this.users[this.users.length-1].userId + 1);
    }
    catch (e) {
      console.log(e);
      this.currentIDEvent.emit(1);
    }

    // localStorage.setItem("currentID", (this.users[this.users.length-1].userId + 1).toString());
    // window.location.href = 'http://localhost:4200/landing';
  }
}
