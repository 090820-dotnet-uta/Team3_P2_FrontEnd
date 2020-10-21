import { HttpClient } from '@angular/common/http';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { Component, Input, OnInit } from '@angular/core';
// import { runInThisContext } from 'vm';
import { GooglePlacesService } from '../google-places.service';
import { User } from '../user';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { Preferences } from '../preferences';
import { MapMarker } from '../marker';
import { google } from "google-maps";
import { Observable } from 'rxjs';
import { delay, retry } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // @Input() currentID: number;
  zoom = 13;
  @Input() lat: number;
  @Input() lng: number;
  @Input() radius: number;
  @Input() displayLocations: boolean;
  @Input() preferences: Preferences;
  marker_lat: number;
  marker_lng: number;
  locations: MapMarker[] = new Array();
  homeIcon = "/assets/Location_Icons/png/Home_3.png";
  user: User;
  google: google;

  formatted_address: string;
  website: string;
  formatted_phone_number: string;

  response: Observable<any>;

  currentIndex = -1;
  currentLocation = null;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 5, 10];

  public dragElement() {
    let elmnt = document.getElementById("locationBox");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }




  constructor(private placesService: GooglePlacesService, private apiService: ApiService) { }

  ngOnInit(): void {
    // this.apiService.getUser(this.currentID).subscribe(user => this.user = user);
    // console.log("User is : " + this.user);
    // this.lat = this.user.latitude;
    // this.lng = this.user.longitude;
    this.SetMarkers();
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.preferences)
  }

  getRequestParams(page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.apiService.getAll(params)
      .subscribe(
        response => {
          const { tutorials, totalItems } = response;
          this.locations = tutorials;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  public wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  public SetMarkers() {
    //Adding Marker to map
    this.marker_lat = this.lat;
    this.marker_lng = this.lng;
    console.log("Map Component LAT is:" + this.marker_lat);
    console.log("Map Component LNG is:" + this.marker_lng);

    this.placesService.setLocation(this.lat, this.lng);
    if(this.radius){
      this.zoom = this.placesService.setRadius(this.radius);
    }
    else{
      this.zoom = this.placesService.setRadius(16093.4);
    }

    // NEED A WAY FOR USERS TO ENTER THIS
    if(this.preferences.animals == true){
      let animalIcon = "/assets/Location_Icons/png/Deer_6.png";
      this.findPlacesOfType("aquarium", animalIcon);
      this.findPlacesOfType("pet_store", animalIcon);
      this.findPlacesOfType("veterinary_care", animalIcon);
      this.findPlacesOfType("zoo", animalIcon);
    }
    if(this.preferences.art == true){
      let artIcon = "/assets/Location_Icons/png/Artist_4.png";
      this.findPlacesOfType("art_gallery", artIcon);
      this.findPlacesOfType("museum", artIcon);
    }
    if(this.preferences.beauty == true){
      let beautyIcon = "/assets/Location_Icons/png/Hair_Dresser_8.png";
      this.findPlacesOfType("beauty_salon", beautyIcon);
      this.findPlacesOfType("hair_care", beautyIcon);
      this.findPlacesOfType("spa", beautyIcon);

    }
    if(this.preferences.entertainment == true){
      let entertainmentIcon = "/assets/Location_Icons/png/Crown_7.png";
      this.findPlacesOfType("bowling_alley", entertainmentIcon);
      this.findPlacesOfType("movie_theater", entertainmentIcon);
      this.findPlacesOfType("tourist_attraction", entertainmentIcon);
    }
    if(this.preferences.fitness == true){
      let fitnessIcon = "/assets/Location_Icons/png/Health_5.png";

      this.findPlacesOfType("gym", fitnessIcon);
      this.findPlacesOfType("bicycle_store", fitnessIcon);
      this.findPlacesOfType("park", fitnessIcon);
    }
    if(this.preferences.homedecour == true){
      let fitnessIcon = "/assets/Location_Icons/png/Flower_2.png";
      this.findPlacesOfType("florist", fitnessIcon);
      this.findPlacesOfType("furniture_store", fitnessIcon);
      this.findPlacesOfType("home_goods_store", fitnessIcon);
    }
    if(this.preferences.learning == true){
      let learningIcon = "/assets/Location_Icons/png/School_1.png";
      this.findPlacesOfType("book_store", learningIcon);
      this.findPlacesOfType("library", learningIcon);
      this.findPlacesOfType("university", learningIcon);
    }
    if(this.preferences.nightlife == true){
      let nightlifeIcon = "/assets/Location_Icons/png/Beer_4.png";
      this.findPlacesOfType("bar", nightlifeIcon);
      this.findPlacesOfType("casino", nightlifeIcon);
      this.findPlacesOfType("night_club", nightlifeIcon);
    }
    if(this.preferences.religion == true){
      let religionIcon = "/assets/Location_Icons/png/Official_2.png";
      this.findPlacesOfType("church", religionIcon);
      this.findPlacesOfType("hindu_temple", religionIcon);
      this.findPlacesOfType("mosque", religionIcon);
      this.findPlacesOfType("synagogue", religionIcon);
    }
    if(this.preferences.shopping == true){
      let shoppingIcon = "/assets/Location_Icons/png/Shopping_Bag_7.png";
      this.findPlacesOfType("clothing_store", shoppingIcon);
      this.findPlacesOfType("department_store", shoppingIcon);
      this.findPlacesOfType("jewelry_store", shoppingIcon);
      this.findPlacesOfType("shoe_store", shoppingIcon);
      this.findPlacesOfType("shopping_mall", shoppingIcon);
    }
  }

  getInformationOfPlace(givenPlace: MapMarker){
    let map = document.getElementById("map") as HTMLDivElement;
    this.placesService.setType(givenPlace.placetype);
    this.response = this.placesService.getPlaces();

    var request = {
      placeId: givenPlace.placeID,
      fields: ['formatted_address', 'formatted_phone_number', 'rating', 'website']
    };
    let service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (place.website) {
          givenPlace.website = place.website;
        }
        if (place.formatted_phone_number) {
          givenPlace.phoneNumber = place.formatted_phone_number;
        }
        givenPlace.clicked = true;
      }
    });
  }

  findPlacesOfType(type: string, iconUrl: string){
    let map = document.getElementById("map") as HTMLDivElement;
    this.placesService.setType(type);
    this.response = this.placesService.getPlaces();
    for (let index = 0; index < 10; index++) {
      this.response.subscribe(
        res => {
          // res.results.length
          var element = res.results[index];
          let marker: MapMarker;
          marker = {
            latitude: element.geometry.location.lat, longitude: element.geometry.location.lng, title: element.name,
            iconUrl: iconUrl, address: element.vicinity, placetype: type, placeID: element.place_id, clicked: false
          }
          let exists = false;
          for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].address == marker.address) {
              exists = true;
            }
          }
          if (!exists) {
            this.locations.push(marker);
          }
        }
      );
    }
  }
}
