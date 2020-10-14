import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    this.login = new FormGroup(
      {
        email: new FormControl()
      }
    );
  }

  onSubmit() {
    console.log(this.login.get('email').value);
  }

}
