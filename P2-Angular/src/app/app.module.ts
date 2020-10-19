import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import {AgmCoreModule } from '@agm/core'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    UsersComponent,
    UserDetailsComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCK8o1hVCxYyT2DI5GImfJcP1hpTQxV5OM'
    }),
    GooglePlaceModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
