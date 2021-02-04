import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenService} from '../../core/security/token.service';
import {UserService} from '../../core/services/user.service';
import {TokenDto} from '../../shared/_models/token-dto.model';
import {Router} from '@angular/router';
import {OauthService} from '../../core/security/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private oauthService: OauthService
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((data) => {});
  }

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.authToken);
        console.log('Este es el token generado: ');
        console.log(tokenGoogle);
        this.oauthService.google(tokenGoogle).subscribe(                // Se realiza al suscripcion al post
          (res) => {
            this.tokenService.setToken(res.value);
            this.userService.getCurrent().subscribe(
              (res) => {
                console.log('Esta es la respuesta: ');
                console.log(res);
                this.tokenService.setUser(res);
                this.router
                  .navigate([this.redirectByRole()])
                  .then();
              }, (error) => {
                console.log('Error dentro de la suscripcion: ');
                console.log(error);
                this.tokenService.logOut();
              }
            );
          }, (error) => {
            console.log('No se obtuvo respuesta');
            console.log(error);
            this.tokenService.logOut();
          }
        );
      })
      .catch((err) => {
        console.log('Error por catch: ');
        console.log(err);
      });
  }

  private redirectByRole(): string {
    let route;
    switch (this.tokenService.getUser().role[0].idRole) {
      case 1:
        route = 'a';
        break;
      case 2:
        route = 'm';
        break;
      default:
        route = 'home';
    }
    return route;
  }
}
