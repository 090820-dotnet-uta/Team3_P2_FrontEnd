import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.register = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        preferencesId: new FormControl()
      }
    );
  }

  onSubmit() {
    let username = this.register.get('username').value;
    let email = this.register.get('email').value;
    let password = this.register.get('password').value;
    let preferencesId = this.register.get('preferencesId').value;
    
    this.apiService.createUser( { username, email, password, preferencesId } as User)
      .subscribe(user => this.user = user);
  }
}
