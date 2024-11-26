import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisenoPageRoutingModule } from './diseno-routing.module';

import { DisenoPage } from './diseno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisenoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DisenoPage]
})
export class DisenoPageModule {}
