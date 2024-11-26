import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { GeneralService } from '../services/handler.service';
import { SharedDataService } from '../services/shared-data.service';  // Importamos el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  role: string | null = null;
  emailData: any;

  constructor(private modalController: ModalController, private authService: AuthService, private router: Router, 
              private generalService: GeneralService, private sharedDataService: SharedDataService) {}

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      backdropDismiss: false // Evita que el usuario cierre el modal sin autenticarse
    });
    await modal.present();

    // Escucha el cierre del modal
    const { data } = await modal.onDidDismiss();
    if (data?.authenticated) {
      // Si el usuario se autenticó correctamente
      this.role = this.authService.getRole();
      this.modalController.dismiss({ authenticated: true });
      console.log('Autenticado con éxito');
      
    } else {
      // Si no se autenticó, vuelve a mostrar el modal
      this.openLoginModal();
    }
  }

  async ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      await this.openLoginModal();
    }
    else {
      // Si ya está autenticado, navega al home
      this.role = this.authService.getRole();
      this.router.navigate(['/home/general']);
    }

    //Relleno los datos de los emails.
    await this.getListaEmail();
  }

  //Metodo para obtener los emails.
  async getListaEmail() {
    try {
      this.emailData = await this.generalService.getEmailData();
      this.sharedDataService.setListaEmailData(this.emailData); 
      console.log('Datos obtenidos:', this.emailData);
    } catch (error) {
      this.emailData = "Error al cargar los datos.";
    }
  };

  async logout() {
    this.authService.logout();
        
    /**this.router.navigate(['/home/general']);
    const modal = await this.modalController.create({
      component: LoginPage,
      backdropDismiss: false // Evita que el usuario cierre el modal sin autenticarse
    });
    await modal.present();
    
    // Escucha el cierre del modal
    const { data } = await modal.onDidDismiss();
    if (data?.authenticated) {
      // Si el usuario se autenticó correctamente
      this.modalController.dismiss({ authenticated: true });
      console.log('Autenticado con éxito');
    } else {
      // Si no se autenticó, vuelve a mostrar el modal
      this.openLoginModal();
    }
    //this.router.navigate(['/login']);
    **/
  }
}

