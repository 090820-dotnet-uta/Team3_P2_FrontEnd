import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { Preferences } from '../preferences';

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
    console.log(this.currentID);
  }

  users$: Observable<User[]>;
  user: User;
  users: User[];
  filteredUsers: User[];
  // currentID: number;
  form: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private userService: UserService) { }

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
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.users$ = this.apiService.getUsers();
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.apiService.getUser(this.currentID)
       .subscribe(user => this.user = user);
  }

  onEdit() {
    const username = this.form.get('username').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);

    this.user.username = username;
    this.user.email = email;
    this.user.password = password;

    this.apiService.editUser(this.user).subscribe(user => this.user = user);
    this.EditUser();
  }

  EditUser() {
    var x = document.getElementById("EditingForm");
    if (x.style.display === "none") {
      x.style.display = "block";
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

  ShowSimilarUsers(userID: number) {
    this.users$ = this.apiService.getUsers();
    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    this.filteredUsers = [];
    for(let i=0; i< this.users.length; i++)
    {
      // Animals, Art, Nightlife, Beauty, Learning, Entertainment, Religion, Shopping, HomeDecour, Fitness
      if (this.users[i].preferencesModel.animals == this.user.preferencesModel.animals ||
          this.users[i].preferencesModel.art == this.user.preferencesModel.art ||
          this.users[i].preferencesModel.nightlife == this.user.preferencesModel.nightlife ||
          this.users[i].preferencesModel.beauty == this.user.preferencesModel.beauty ||
          this.users[i].preferencesModel.learning == this.user.preferencesModel.learning ||
          this.users[i].preferencesModel.entertainment == this.user.preferencesModel.entertainment ||
          this.users[i].preferencesModel.religion == this.user.preferencesModel.religion ||
          this.users[i].preferencesModel.shopping == this.user.preferencesModel.shopping ||
          this.users[i].preferencesModel.homedecour == this.user.preferencesModel.homedecour ||
          this.users[i].preferencesModel.fitness == this.user.preferencesModel.fitness)
      {
        this.filteredUsers.push(this.users[i]);
      }
    }

    var x = document.getElementById("ShowUsersDisplay");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}
