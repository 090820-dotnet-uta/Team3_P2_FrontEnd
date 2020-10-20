export class MapMarker {
    latitude: number;
    longitude: number;
    iconUrl: string;
    title: string;
    address: string;
    placetype: string;
    placeID: string;
    website?: string;
    phoneNumber?: string;
    clicked?: boolean;

    constructor(latitude: number, longitude: number, title: string, iconUrl: string, address: string, placetype: string, placeID: string,
        website?: string, phoneNumber?: string, clicked?: boolean){
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.iconUrl = iconUrl;
        this.address = address;
        this.placetype = placetype;
        this.placeID = placeID;
        if(website){
          this.website = website;
        }
        if(phoneNumber){
          this.phoneNumber = phoneNumber;
        }
        if(clicked){
          this.clicked = clicked;
        }
    }
}
