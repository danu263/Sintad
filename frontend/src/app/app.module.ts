import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

// Social Login
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import {AppRoutingModule} from './app.routing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './sintad/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    RouterModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CoreModule,
    SharedModule,

    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '826096868875-9h0ddn7auj8m7t2bpb91j6rcf2ss8rof.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
