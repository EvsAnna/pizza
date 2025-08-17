import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {

  constructor() {
  }

  private isLogged = false;
  public isLogged$: Subject<boolean> = new Subject();

  logIn() {
    this.isLogged = true;
    this.isLogged$.next(this.isLogged);
  }

  logOut() {
    this.isLogged = false;
    this.isLogged$.next(this.isLogged);
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  getToken() {
    return 'test';
  }
}
