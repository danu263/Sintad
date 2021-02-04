import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRolRouting } from './admin-rol.routing';
import { AdminRolComponent } from './admin/admin-rol.component';
import { EntidadComponent } from './entidad/entidad.component';
import { TipoContribuyenteComponent } from './tipo-contribuyente/tipo-contribuyente.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AdminRolComponent, EntidadComponent, TipoContribuyenteComponent, TipoDocumentoComponent],
  imports: [
    CommonModule,
    AdminRolRouting,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class AdminRolModule { }
