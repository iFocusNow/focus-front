import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, handleError, httpOptions } from './http-data';
import { Alert } from '../models/alerts';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/alerts';

  getChildAlert(child_id: string): Observable<Alert[]> {
    return this.http
      .get<Alert[]>(this.baseUrl + "/get/" + child_id, {headers: httpOptions.headers,});
      
  }
}
