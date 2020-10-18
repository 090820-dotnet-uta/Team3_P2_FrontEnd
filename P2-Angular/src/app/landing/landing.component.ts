import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editingForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private userService: UserService) {
    this.editingForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email:    new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      city:     new FormControl('', [Validators.required])
    });
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

    this.users$ = this.apiService.getUsers();
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    this.editingForm;
  }

  onEdit() {
    this.isSubmitted = true;
    const username = this.editingForm.get('username').value;
    const email = this.editingForm.get('email').value;
    const password = this.editingForm.get('password').value;
    const city = this.editingForm.get('city').value;

    this.apiService.getUser(this.currentID).subscribe(user => this.user = user);

    this.user.username = username;
    this.user.email = email;
    this.user.password = password;
    this.user.city = city;

    if (this.editingForm.valid)
    {
      this.isSubmitted = false;
      this.apiService.editUser(this.user).subscribe(user => this.user = user);
      this.EditUser();
    }
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
