import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() currentIDEvent = new EventEmitter<number>();
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  users: User[];
  currentID: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.apiService.getUsers().subscribe(users => this.users = users);
    this.form = this.fb.group({
      username: ['', Validators.email, Validators.required],
      password: ['', Validators.required]
    });
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/landing';

    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.apiService.getUsers().subscribe(users => this.users = users);
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        // await this.authService.login(username, password);

        for(let i=0; i< this.users.length; i++)
        {
          console.log(this.users[i].userId);
          if (this.users[i].email == username && this.users[i].password == password)
          {
            // this.userService.setCurrentID(this.users[i].userId);
            this.currentIDEvent.emit(this.users[i].userId);
            console.log(this.users[i].userId);
            // localStorage.setItem("currentID", this.users[i].userId.toString());
            //alert(`${this.userService.getCurrentID()}`);
            // window.location.href = 'http://localhost:4200/landing';
          }
        }

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import { UsersComponent } from '../users/users.component';
// import { FormControl, FormGroup } from '@angular/forms';
// import { Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { User } from '../user';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   login: FormGroup;
//   users$: Observable<User[]>;
//   user$: Observable<User>;
//   user: User;

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.login = new FormGroup(
//       {
//         email: new FormControl(),
//         password: new FormControl()
//       }
//     );
//   }

//   onSubmit() {
//     let userEmail = this.login.get('email').value;
//     console.log(Boolean(userEmail));
//     this.users$ = this.apiService.getUsers();
//     this.apiService.getUser()
//       .subscribe(user => this.user = user);
//   }

// }
