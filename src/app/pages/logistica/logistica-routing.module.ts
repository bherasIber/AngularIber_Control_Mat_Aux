import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogisticaPage } from './logistica.page';

const routes: Routes = [
  {
    path: '',
    component: LogisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticaPageRoutingModule {}
