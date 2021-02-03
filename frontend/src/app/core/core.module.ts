import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { AuthService } from './security/auth.service';
import { AdminAuthGuard } from './auth-guards/admin-auth-guard.service';
import { AnonAuthGuard } from './auth-guards/anon-auth-guard.service';
import { TokenService } from './security/token.service';
import { OauthService } from './security/oauth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    UserService,
    AuthService,
    AdminAuthGuard,
    AnonAuthGuard,

    TokenService,
    OauthService,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
