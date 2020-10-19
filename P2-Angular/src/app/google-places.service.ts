import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  private placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  private location = 'location=';
  private radius = '&radius=';
  private rankby = '&rankby=prominence'
  private type = '&type=';
  private APIKey = '&key=AIzaSyCK8o1hVCxYyT2DI5GImfJcP1hpTQxV5OM';
  connectionString: string;
  // options: {
  //   headers: {[header: string]: "http://localhost:4200/"},
  //   responseType: 'arraybuffer'//|'blob'|'json'|'text',
  // }
  constructor(private http: HttpClient) { }

  setLocation(lat: number, lng: number) {
    this.location = this.location + lat + "," + lng;
    console.log("Location string is: " + this.location);
  }

  setRadius(radius: number){
    if(radius <= 0){
      this.radius = this.radius + 1600;
      return 14;
    }
    else if(radius > 50000){
      this.radius = this.radius + 50000;
      return 5;
    }
    else{
    this.radius = this.radius + radius;
    return 11;
    }
  }

  setType(type: string){
    this.type = this.type + type;
  }

  getPlaces(): Observable<any> {
    // console.log("Your connections string: " + this.placesURL + this.location +
    //   this.radius + this.type + this.APIKey)
    this.connectionString = this.placesURL + this.location + this.radius + this.rankby + this.type + this.APIKey;
    return this.http.get(this.connectionString).pipe(
        tap(_ => console.log('fetched places')),
        catchError(this.handleError('getPlaces', []))
      )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
} 

