import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class BlockPeriodService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/blockperiods';

  editBlockPeriod(data: any, block_period_id: string): any {
    return this.http.put<any>(this.baseUrl + '/' + block_period_id, data, {
      headers: httpOptions.headers,
    });
  }
}
