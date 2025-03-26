import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:4000/api/users";

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, {
      name: user.name,
      age: user.age,
      email: user.email,
      password: user.password // 确保发送密码
    });
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  //No s'utilitza però es pot fer servir per obtenir un usuari en concret a partir de la seva id
  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.apiUrl+"/"+id);
  }

  
}

