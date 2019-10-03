import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(name, email, username, password) {
    return this.http.post<any>('http://localhost:5000/api/auth/signup',{name, email, username, password});
  }
}
