import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Device } from '../models/device';
import { baseUrl, handleError } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}
  baseUrl = baseUrl + '/devices';

  getChildrenDevices(child_id: number): Observable<Device> {
    return this.http
      .get<Device>(this.baseUrl + '?child_id=' + child_id)
      .pipe(retry(2), catchError(handleError));
  }
  updateDevice(device: Device): Observable<Device>{
    return this.http.put<Device>(this.baseUrl +"/"+device.id, device)
      .pipe(retry(2), catchError(handleError));
  }
}
