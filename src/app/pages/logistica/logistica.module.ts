import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogisticaPageRoutingModule } from './logistica-routing.module';

import { LogisticaPage } from './logistica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogisticaPageRoutingModule
  ],
  declarations: [LogisticaPage]
})
export class LogisticaPageModule {}
