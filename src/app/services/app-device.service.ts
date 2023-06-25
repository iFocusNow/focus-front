import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { AppDevice } from '../models/appDevice';
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class AppDeviceService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/appDevices';

  getAppDevice(device_id: string): Observable<AppDevice> {
    return this.http
      .get<AppDevice>(this.baseUrl + '?device_id=' + device_id)
      .pipe(retry(2), catchError(handleError));
  }
}
