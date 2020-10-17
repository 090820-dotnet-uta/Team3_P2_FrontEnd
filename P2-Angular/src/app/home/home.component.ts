import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private currentID: number;
  constructor() { }

  ngOnInit(): void {
    this.currentID = parseInt(localStorage.getItem("currentID"));
    if (this.currentID == 0)
    {
      window.location.href = 'https://winnerteamfrontend.azurewebsites.net/login';
    }
  }

}
