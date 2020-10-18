import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Preferences } from '../preferences';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    userId: 0,
    username: "",
    email: "",
    password: "",
    city: "",
    preferencesModel: {animals: false, art: false, nightlife: false, beauty: false, learning: false, entertainment: false, religion: false, shopping: false, homedecour: false, fitness: false}
  }

  constructor() { }

  ngOnInit(): void {
  }

}
