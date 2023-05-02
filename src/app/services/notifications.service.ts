import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, handleError } from './http-data';
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

  getParentAlert(parent_id: number): Observable<Alert> {
    return this.http
      .get<Alert>(this.baseUrl + '?parent_id=' + parent_id)
      .pipe(retry(2), catchError(handleError));
  }
}
