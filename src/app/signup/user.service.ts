// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Improved username check with error handling
  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username/${username}`).pipe(
      catchError(error => {
        console.error('Error checking username:', error);
        return of(false); // Return false if there's an error
      })
    );
  }

  // Similarly for email check
  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email/${email}`).pipe(
      catchError(error => {
        console.error('Error checking email:', error);
        return of(false);
      })
    );
  }

  // Add user with error handling
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        throw error; // Re-throw to handle in component
      })
    );
  }
}