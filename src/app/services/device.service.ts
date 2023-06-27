import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Device } from '../models/device';
import { baseUrl, handleError, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  getChildrenDevices(child_id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/devices/' + child_id, {
      headers: httpOptions.headers,
    });
  }
  getDevices(): Observable<Device> {
    return this.http
      .get<Device>(baseUrl)
      .pipe(retry(2), catchError(handleError));
  }
  updateDevice(device: Device): Observable<Device> {
    return this.http
      .put<Device>(baseUrl + '/' + device.id, device)
      .pipe(retry(2), catchError(handleError));
  }
  addDevice(device: Device): Observable<Device> {
    return this.http
      .post<Device>(baseUrl, device)
      .pipe(retry(2), catchError(handleError));
  }

  addDeviceToChild(childId: string, device: Device): Observable<any> {
    const url = "${baseUrl}/add/device/${childId}";
    return this.http.post<any>(url, device, httpOptions).pipe(
      catchError(handleError)
      );
  }
}
