import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisenoPage } from './diseno.page';

const routes: Routes = [
  {
    path: '',
    component: DisenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisenoPageRoutingModule {}
