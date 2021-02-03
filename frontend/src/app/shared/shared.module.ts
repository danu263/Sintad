import {NgModule} from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarAdminComponent} from './navbar/navbar-admin/navbar-admin.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarAdminComponent
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule{}
