import { AppComponent } from './app.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
// import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = 
    [
        { path: 'home', component: HomeComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'register', component: RegisterComponent }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }