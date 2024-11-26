import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user = this.userSubject.asObservable();
  

  private users = [
    { username: 'logistica', password: '1234', role: 'logistica' },
    { username: 'diseño', password: '1234', role: 'diseño' },
    { username: 'calidad', password: '1234', role: 'calidad' },
    { username: 'laboratorio', password: '1234', role: 'laboratorio' },
    { username: 'admin', password: '1234', role: 'admin' }
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.userSubject.next(user);
      return true;
    }
    return false;
  }

  
  logout() {
    this.userSubject.next(null);
    window.location.reload();
  }

  getRole() {
    const user = this.userSubject.value;
    return user ? user.role : null;
  }

  isLoggedIn() {
    return this.userSubject.value != null;
  }
}
