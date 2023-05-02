import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import 
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/children';

  getParentChildren(parent_id: number): Observable<Child> {
    return this.http
      .get<Child>(this.baseUrl + '?parent_id=' + parent_id)
      .pipe(retry(2), catchError(handleError));
  }
}
