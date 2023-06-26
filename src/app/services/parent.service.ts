import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { catchError, Observable, retry } from 'rxjs';
import { Parent } from '../models/parent';
import { baseUrl, handleError } from './http-data';

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

  getParent(id: string): Observable<Parent> {
    return this.http
      .get<Parent>(baseUrl + '?id=' + id)
      .pipe(retry(2), catchError(handleError));
  }
}
