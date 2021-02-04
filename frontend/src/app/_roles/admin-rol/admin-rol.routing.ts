import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRolComponent } from './admin/admin-rol.component';
import {EntidadComponent} from './entidad/entidad.component';
import {TipoContribuyenteComponent} from './tipo-contribuyente/tipo-contribuyente.component';
import {TipoDocumentoComponent} from './tipo-documento/tipo-documento.component';

const routes: Routes = [
  { path: '', component: AdminRolComponent },
  { path: 'entidad',        component: EntidadComponent },
  { path: 'contribuyente',  component: TipoContribuyenteComponent },
  { path: 'documento',      component: TipoDocumentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRolRouting { }
