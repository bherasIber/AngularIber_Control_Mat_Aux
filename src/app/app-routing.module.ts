import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomePage } from './home/home.page';
import { LoginPage } from './pages/login/login.page';
import { LogisticaPage } from './pages/logistica/logistica.page';
import { GeneralPage } from './pages/general/general.page';
import { DisenoPage } from './pages/diseno/diseno.page';
import { CalidadPage } from './pages/calidad/calidad.page';
import { LaboratorioPage } from './pages/laboratorio/laboratorio.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'home' },
  { path: 'home', component: HomePage,
    children: [
      { path: 'general', component: GeneralPage, canActivate: [AuthGuard], data: { roles: ['logistica','diseño','calidad','laboratorio','admin'] } },
      { path: 'logistica', component: LogisticaPage, canActivate: [AuthGuard], data: { roles: ['logistica', 'admin'] } },
      { path: 'diseno', component: DisenoPage, canActivate: [AuthGuard], data: { roles: ['diseño','admin'] } },
      { path: 'calidad', component: CalidadPage, canActivate: [AuthGuard], data: { roles: ['calidad','admin'] } },
      { path: 'laboratorio', component: LaboratorioPage, canActivate: [AuthGuard], data: { roles: ['laboratorio','admin'] } },
      { path: '', redirectTo: 'general', pathMatch: 'full', }, // Redirecciona por defecto a una de las subpáginas
    ]
  },

  //{ path: 'login', component: LoginPage },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
