import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboratorioPageRoutingModule } from './laboratorio-routing.module';

import { LaboratorioPage } from './laboratorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboratorioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LaboratorioPage]
})
export class LaboratorioPageModule {}
