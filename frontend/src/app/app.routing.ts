import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './sintad/login/login.component';
import {AnonAuthGuard} from './core/auth-guards/anon-auth-guard.service';
import {AdminAuthGuard} from './core/auth-guards/admin-auth-guard.service';
import {ModAuthGuard} from './core/auth-guards/mod-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',             component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AnonAuthGuard],
  }/*,

  // Admin navigation
  {
    path: 'a',
    loadChildren: () =>
      import('./_roles/admin-role/admin-role.module').then(
        (m) => m.AdminRoleModule
      ),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'm',
    loadChildren: () =>
      import('./_roles/mod-role/mod-role.module').then(
        (m) => m.ModRoleModule
      ),
    canActivate: [ModAuthGuard],
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
