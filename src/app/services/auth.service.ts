import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {first} from "rxjs/operators";
import {Nutzer} from "../types/nutzer";

const AUTH_API = environment.backendURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions).pipe(
      first()
    );
  }

  register(nutzer: Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(AUTH_API + '/service/rest/register', nutzer).pipe(
      first()
    );
  }
}
