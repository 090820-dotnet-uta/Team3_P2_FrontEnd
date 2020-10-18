import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://winnerteambackend.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  public getUsers(): Observable<User[]> {
    const REQUEST_URL = `${this.API_URL}/users`;
    return this.http.get<User[]>(`${REQUEST_URL}`);
  }

  public getUser(): Observable<User> {
    const REQUEST_URL = `${this.API_URL}/users/8`;
    return this.http.get<User>(`${REQUEST_URL}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user, this.httpOptions);
  }

  public editUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.userId;
    const REQUEST_URL = `${this.API_URL}/${id}`

    return this.http.put<User>(REQUEST_URL, user, this.httpOptions)
  }

  public deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.userId;
    const REQUEST_URL = `${this.API_URL}/${id}`

    return this.http.delete<User>(REQUEST_URL, this.httpOptions)
  }
}
