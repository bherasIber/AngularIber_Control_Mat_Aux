import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home/home.module';
import { ModalSelectionComponent } from './components/modal-selection/modal-selection.component';

@NgModule({
  declarations: [AppComponent, ModalSelectionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HomePageModule],
  exports: [ModalSelectionComponent], // Exporta para reutilizar
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
