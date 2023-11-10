import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, httpOptions } from './http-data';
import { Alert } from '../models/alerts';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/alerts';

  getChildAlert(parent_id: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl + '/' + parent_id, {
      headers: httpOptions.headers,
    });
  }
}
