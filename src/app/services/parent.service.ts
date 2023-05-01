import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  private apiUrl = "http://localhost:3000/parents"
  constructor(private http:HttpClient){}

  authenticateParent(parent: Parent): Observable<boolean>{
    return this.http.get<Parent[]>(this.apiUrl).pipe(
      map((parents) => {
        const foundParent = parents.find(
          (p) => p.email === parent.email && p.password === parent.password
        );
        return foundParent !== undefined;
      })
    );
  }
}
