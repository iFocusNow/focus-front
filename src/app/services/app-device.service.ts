import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class AppDeviceService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/appDevices';

  getAppDevice(device_id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + device_id, {
      headers: httpOptions.headers,
    });
  }
}
