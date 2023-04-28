import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Children } from '../models/child';
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/children';

  getParentChildren(parent_id: number): Observable<Children> {
    return this.http
      .get<Children>(this.baseUrl + '?parent_id=' + parent_id)
      .pipe(retry(2), catchError(handleError));
  }
}
