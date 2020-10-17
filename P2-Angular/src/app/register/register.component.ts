import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: number;
  name: string;
  email: string;
  password: string;
  register: FormGroup;
  user: User;
  users: User[];

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
        preferencesId: new FormControl()
      }
    );
  }

  onRegister() {
    let username = this.register.get('username').value;
    let email = this.register.get('email').value;
    let password = this.register.get('password').value;
    let preferencesId = this.register.get('preferencesId').value;

    this.apiService.createUser( { username, email, password, preferencesId } as User)
      .subscribe(user => this.user = user);
    localStorage.setItem("currentID", (this.users[this.users.length-1].userId + 1).toString());
    window.location.href = 'https://winnerteamfrontend.azurewebsites.net/landing';
  }
}
