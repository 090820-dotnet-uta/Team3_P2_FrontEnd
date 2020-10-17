import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'P2-Angular';
  isAuthenticated: boolean;
  // currentID = parseInt(localStorage.getItem("currentID"));
  //currentID = new BehaviorSubject<number>(parseInt(localStorage.getItem("currentID")));
  currentID: number;
  loginFlag: boolean = false;
  registerFlag: boolean = false;

  constructor(public authService: AuthService, private userService: UserService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.currentID = 0;
    // this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  currentIDEventHandler($event: any) {
    this.currentID = $event;
    this.loginFlag = false;
    this.registerFlag = false;
  }

  registeredEventHandler($event: any) {
    this.loginFlag = false;
    this.registerFlag = false;
  }

  clickedHome() {
    this.registerFlag = false;
    this.loginFlag = false;
  }

  clickedLogin() {
    this.loginFlag = true;
    this.registerFlag = false;
  }

  clickedRegister() {
    this.registerFlag = true;
    this.loginFlag = false;
  }

  clickedLogout() {
    /// localStorage.setItem("currentID", "0");
    this.currentID = 0;
    this.loginFlag = true;
    this.registerFlag = false;
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'P2-Angular';
// }
