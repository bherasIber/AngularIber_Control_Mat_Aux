import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalidadPageRoutingModule } from './calidad-routing.module';

import { CalidadPage } from './calidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalidadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CalidadPage]
})
export class CalidadPageModule {}
