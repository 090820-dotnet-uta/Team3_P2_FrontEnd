import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  users$: Observable<User[]>;
  user: User;
  currentID: number;
  form: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    // this.currentID = this.userService.getCurrentID();
    // alert(`${this.userService.getCurrentID()}`);
    // alert(`${this.userService.getCurrentID()}`);
    this.currentID = parseInt(localStorage.getItem("currentID"));
    if (this.currentID == 0)
    {
      window.location.href = 'https://winnerteamfrontend.azurewebsites.net/login';
    }
    // alert(`${this.currentID}`);

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.users$ = this.apiService.getUsers();
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
    localStorage.setItem("currentID", "0");
    this.currentID = 0;
    window.location.href = 'https://winnerteamfrontend.azurewebsites.net/home';
  }
}
