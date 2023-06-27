import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Child } from '../models/child';
import { baseUrl, handleError, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}

  getParentChildren(parent_id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/children/by/' + parent_id, {
      headers: httpOptions.headers,
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

  addChild(child: Child, parentid: string): Observable<Child> {
    const url = `${baseUrl}/add/child/${parentid}`;
    return this.http.post<any>(url, child,  httpOptions).pipe(
      catchError(handleError)
      );
  }
}
