import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { LandingComponent } from './landing/landing.component';

const routes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: 'register', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'landing', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
