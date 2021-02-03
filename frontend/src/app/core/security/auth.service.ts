import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenService} from './token.service';

const base = 'SINTAD';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  navBarTitle(): string {
    let title = base;
    if (this.isAdmin()) {
      title = title + ` Admin`;
    } else if (this.isMod()) {
      title = title + ` Mod`;
    } else if (this.isAnon()) {
      title = title + ' NoLogged';
    }
    return title;
  }

  logout(): void {
    this.tokenService.logOut();
  }

  isLoggedIn(): boolean {
    let user = this.getCurrentUser();
    return user != null;
  }

  getCurrentUser(): any {
    return this.tokenService.getUser();
  }

  /*
    Users can Fool this validation,
    but when consuming API REST, the backend always verify the user authenticity.
 */

  isAdmin(): boolean {
    let user = this.getCurrentUser();
    if (!user) { return false ; }
    return user.role[0].idRole === 1;
  }

  isMod(): boolean {
    let user = this.getCurrentUser();
    if (!user) { return false; }
    return user.role[0].idRole === 2;
  }

  isAnon() {
    return this.getCurrentUser() == null;
  }
}
