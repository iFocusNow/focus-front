import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, httpOptions } from './http-data';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) {}
  authenticateParent(parentAuthDto: any): Observable<boolean> {
    return this.http.post<boolean>(
      baseUrl + '/session/authenticate-parent',
      parentAuthDto,
    );
  }

  registerParent(parentUserDto: any): Observable<boolean> {
    return this.http.post<boolean>(
      baseUrl + '/session/register-parent',
      parentUserDto,
    );
  }

  getParent(email: string): Observable<any> {
    return this.http.get<any>(
      baseUrl + `/parent?email=${encodeURIComponent(email)}`,
      {
        headers: httpOptions.headers,
      },
    );
  }

  recoverPassword(passwordDto: any): Observable<boolean> {
    return this.http.put<any>(
      baseUrl + '/session/recover-password',
      passwordDto,
    );
  }
}
