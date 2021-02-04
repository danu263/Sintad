import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModRolRouting } from './mod-rol.routing';
import { ModRolComponent } from './mod/mod-rol.component';


@NgModule({
  declarations: [ModRolComponent],
  imports: [
    CommonModule,
    ModRolRouting
  ]
})
export class ModRolModule { }
