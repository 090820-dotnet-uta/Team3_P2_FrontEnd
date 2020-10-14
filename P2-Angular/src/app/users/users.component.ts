import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    userId: 1,
    username: "David Dowd",
    email: "daviddowd@gmail.com",
    password: "ddowd97",
    preferencesId: 1
  }


  constructor() { }

  ngOnInit(): void {
  }

}
