import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: number;
  name: string;
  email: string;
  password: string;
  login: FormGroup;
  users$: Observable<User[]>;
  user$: Observable<User>;
  user: User;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.login = new FormGroup(
      {
        email: new FormControl()
      }
    );
  }

  onSubmit() {
    let userEmail = this.login.get('email').value;
    console.log(Boolean(userEmail));
    this.users$ = this.apiService.getUsers();
    this.apiService.getUser()
      .subscribe(user => this.user = user);
  }

}
