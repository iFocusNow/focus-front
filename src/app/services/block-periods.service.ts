import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class BlockPeriodService {
  constructor(private http: HttpClient) {}

  editBlockPeriod(blockperiod_id: string, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + '/' + blockperiod_id, data, {
      headers: httpOptions.headers,
    });
  }
}
