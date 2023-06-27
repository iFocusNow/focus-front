import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { throwError } from 'rxjs';

// Base Url
export const baseUrl = 'https://ifocusnow-backend.azurewebsites.net/api';

const username = localStorage.getItem('email');
const password = localStorage.getItem('password');

const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const authHeader = `Basic ${credentials}`;

// Http Options
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: authHeader,
  }),
};

// Http API Errors
export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Default Error Handling
    console.log(`An error ${error.status} ocurred: ${error.error}`);
  } else {
    // Unsuccessful Response Error Code returned from Backend
    console.log(`Backend returned code ${error.status}. ${error.error}`);
  }
  return throwError(() => {
    return new Error(
      'Something happened with the request, please try again later.'
    );
  });
}
