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
  baseUrl = baseUrl + '/parents';

  authenticateParent(parent: Parent): Observable<boolean> {
    return this.http.get<Parent[]>(this.baseUrl).pipe(
      map((parents) => {
        const foundParent = parents.find(
          (p) => p.email === parent.email && p.password === parent.password
        );
        return foundParent !== undefined;
      })
    );
  }

  registerParent(parent: Parent): Observable<Parent> {
    return this.http.get<Parent[]>(this.baseUrl).pipe(
      map((parents) => {
        const foundParent = parents.find((p) => p.email === parent.email);
        if (foundParent) {
          throw new Error('El correo electrónico ya está en uso');
        }
        return parent;
      }),
      switchMap((parent) => this.http.post<Parent>(this.baseUrl, parent))
    );
  }

  getParent(id: string): Observable<Parent> {
    return this.http
      .get<Parent>(this.baseUrl + '?id=' + id)
      .pipe(retry(2), catchError(handleError));
  }
}
