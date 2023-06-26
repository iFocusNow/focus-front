import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Child } from '../models/child';
import { baseUrl, handleError } from './http-data';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}
  username = localStorage.getItem('email');
  password = localStorage.getItem('password');

  credentials = Buffer.from(`${this.username}:${this.password}`).toString(
    'base64'
  );
  authHeader = `Basic ${this.credentials}`;

  headers = new HttpHeaders({
    Authorization: this.authHeader,
  });

  getParentChildren(parent_id: string): Observable<any> {
    console.log(this.authHeader);
    return this.http.get<any>(baseUrl + '/children/by/' + parent_id, {
      headers: this.headers,
    });
  }
  getChildren(child_id: string): Observable<Child> {
    return this.http
      .get<Child>(baseUrl + '/' + child_id)
      .pipe(retry(2), catchError(handleError));
  }
  updateChild(child: Child): Observable<Child> {
    return this.http
      .put<Child>(baseUrl + '/' + child.id, child)
      .pipe(retry(2), catchError(handleError));
  }
}
