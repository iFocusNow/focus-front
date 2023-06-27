import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { App } from '../models/app';
import { baseUrl, handleError, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/apps';

  getApps(): Observable<App> {
    return this.http.get<App>(this.baseUrl, {
      headers: httpOptions.headers,
    });
  }

  getApp(app_id: string): Observable<App> {
    return this.http
      .get<App>(this.baseUrl + '?id=' + app_id)
      .pipe(retry(2), catchError(handleError));
  }
}
