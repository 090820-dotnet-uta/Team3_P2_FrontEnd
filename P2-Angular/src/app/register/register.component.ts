import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    this.register = new FormGroup(
      {
        email: new FormControl(),
        password: new FormControl()
      }
    );
  }

  onSubmit() {
    console.log(this.register.get('email').value);
  }
}
