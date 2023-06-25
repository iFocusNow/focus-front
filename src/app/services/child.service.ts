import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Child } from '../models/child';
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/children';

  getParentChildren(parent_id: string): Observable<Child> {
    return this.http
      .get<Child>(this.baseUrl + '?parent_id=' + parent_id)
      .pipe(retry(2), catchError(handleError));
  }
  getChildren(child_id: string): Observable<Child> {
    return this.http.get<Child>(this.baseUrl +"/"+child_id)
      .pipe(retry(2), catchError(handleError));
  }
  updateChild(child: Child): Observable<Child>{
    return this.http.put<Child>(this.baseUrl +"/"+ child.id, child)
      .pipe(retry(2), catchError(handleError));
  }

}
