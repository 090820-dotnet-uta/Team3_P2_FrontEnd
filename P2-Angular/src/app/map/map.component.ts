import { HttpClient } from '@angular/common/http';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { Component, Input, OnInit } from '@angular/core';
// import { runInThisContext } from 'vm';
import { GooglePlacesService } from '../google-places.service';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // @Input() currentID: number;
  zoom = 9;
  @Input() lat: number;
  @Input() lng: number;
  marker_lat: number;
  marker_lng: number;
  locations: Object[] = new Array();
  homeIcon = "/assets/Location_Icons/png/Home_3.png";
  user: User;

  constructor(private placesService: GooglePlacesService, private apiService: ApiService) { }

  ngOnInit(): void {
    // this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    // console.log("User is : " + this.user);
    // this.lat = this.user.latitude;
    // this.lng = this.user.longitude;
    this.SetMarkers();
    console.log(this.lat);
    console.log(this.lng);
  }

  public SetMarkers() {
    //Adding Marker to map
    this.marker_lat = this.lat;
    this.marker_lng = this.lng;
    console.log("Map Component LAT is:" + this.marker_lat);
    console.log("Map Component LNG is:" + this.marker_lng);

    this.placesService.setLocation(this.lat, this.lng);

    // NEED A WAY FOR USERS TO ENTER THIS
    this.placesService.setType('bar');
    this.zoom = this.placesService.setRadius(0);
    var response = this.placesService.getPlaces();
    response.subscribe(
      res => {
        for (let index = 0; index < res.results.length; index++) {
          var element = res.results[index];
          this.locations.push(element);
          console.log("Name of location " + index + " = " + element.name);
          if (index == 4) {
            break;
          }
          // console.log("This location is named: " + res.results[index].name);
        } console.log('HTTP response', res.results)
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }
}
