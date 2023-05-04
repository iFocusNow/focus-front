import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Parent } from '../models/parent';
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/parents';

  getParent(id: number): Observable<Parent> {
    return this.http
      .get<Parent>(this.baseUrl + '?id=' + id)
      .pipe(retry(2), catchError(handleError));
  }
}
