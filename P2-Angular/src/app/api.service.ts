import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://winnerteambackend.azurewebsites.net/users';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  public getUsers(): Observable<User[]> {
    const REQUEST_URL = `${this.API_URL}`;
    return this.http.get<User[]>(`${REQUEST_URL}`);
  }

  public getUser(userID: number): Observable<User> {
    const REQUEST_URL = `${this.API_URL}/${userID}`;
    return this.http.get<User>(`${REQUEST_URL}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user, this.httpOptions);
  }

  public editUser(user: User): Observable<User> {
    const REQUEST_URL = `${this.API_URL}/${user.userId}`;
    return this.http.put<User>(REQUEST_URL, user, this.httpOptions);
  }

  public deleteUser(userID: number): Observable<User> {
    const REQUEST_URL = `${this.API_URL}/${userID}`;
    return this.http.delete<User>(REQUEST_URL, this.httpOptions);
  }

  getAll(params): Observable<any> {
    return this.http.get("https://winnerteamfrontend.azurewebsites.net", { params });
  }
}
