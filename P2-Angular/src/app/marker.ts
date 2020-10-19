export class MapMarker {
    latitude: number;
    longitude: number;
    iconUrl: string;
    title: string;
    constructor(latitude: number, longitude: number, title: string, iconUrl: string){
        this.latitude = latitude;
        this.longitude = longitude;
        this.title = title;
        this.iconUrl = iconUrl;
    }
}