import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/landing';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.login(username, password);
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
