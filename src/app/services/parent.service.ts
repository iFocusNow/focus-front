import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './http-data';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) {}
  authenticateParent(parentAuthDto: any): Observable<boolean> {
    return this.http.post<boolean>(
      baseUrl + '/session/authenticate-parent',
      parentAuthDto
    );
  }

  registerParent(parentUserDto: any): Observable<boolean> {
    return this.http.post<boolean>(
      baseUrl + '/session/register-parent',
      parentUserDto
    );
  }

  getParent(email: string): Observable<any> {
    const username = email;
    const password = localStorage.getItem('password');

    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );
    const authHeader = `Basic ${credentials}`;

    const headers = new HttpHeaders({
      Authorization: authHeader,
    });

    return this.http.get<any>(
      baseUrl + `/parent?email=${encodeURIComponent(email)}`,
      {
        headers: headers,
      }
    );
  }
}
