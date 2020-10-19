export class MapMarker {
    latitude: number;
    longitude: number;
    iconUrl: string;
    title: string;
    address: string;
    website?: string;
    phoneNumber?: string;

    constructor(latitude: number, longitude: number, title: string, iconUrl: string, address: string, 
        website?: string, phoneNumber?: string){
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.iconUrl = iconUrl;
        this.address = address;
        if(website){
            this.website = website;
        }
        if(phoneNumber){
            this.phoneNumber = phoneNumber;
        }
    }
}