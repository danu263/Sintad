import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModRolComponent } from './mod/mod-rol.component';

const routes: Routes = [{ path: '', component: ModRolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModRolRouting { }
