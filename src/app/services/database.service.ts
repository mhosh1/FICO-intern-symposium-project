import { Injectable } from '@angular/core';
import * as sqlite3 from 'sqlite3';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('./backend/users.db');
  }

  addUser(userData: any): void {
    const query = `
      INSERT INTO users (firstName, lastName, email, username, password, team, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    this.db.run(query, [
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.username,
      userData.password,
      userData.team,
      userData.role,
    ], (err: Error | null) => {
      if (err) {
        console.error('Error adding user:', err.message);
      } else {
        console.log('User added successfully!');
      }
    });
  }
}