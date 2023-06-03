import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLUsers}/${userId}`);
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  getCountries() {
    return Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }
}
