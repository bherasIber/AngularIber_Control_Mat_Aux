import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { GeneralPageModule } from '../pages/general/general.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LogisticaPageModule } from '../pages/logistica/logistica.module';
import { DisenoPageModule } from '../pages/diseno/diseno.module';
import { CalidadPageModule } from '../pages/calidad/calidad.module';
import { LaboratorioPageModule } from '../pages/laboratorio/laboratorio.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GeneralPageModule,
    LoginPageModule,
    LogisticaPageModule,
    DisenoPageModule,
    CalidadPageModule,
    LaboratorioPageModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
