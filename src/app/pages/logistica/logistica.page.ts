import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/handler.service';
import { AlertController, ToastController } from '@ionic/angular'; // Importar el ToastController
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.page.html',
  styleUrls: ['./logistica.page.scss'],
})
export class LogisticaPage implements OnInit {

  logisticaData: any = {
    fcReferencia: '',
    fcDesciripcion: '',
    fdtLogisticaEnvio: '',
    fcLogisticaObs: '',
    fcVersion: ''
  };
  datos: any[] = [];

  listaEmailData: any;

  constructor(private generalService: GeneralService, private toastController: ToastController, private router: Router, 
              private alertController: AlertController, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    // Inicializa los campos vacíos cuando se carga la página
    this.clearFields();
    this.listaEmailData = this.sharedDataService.getListaEmailData();
  }

  // Limpia todos los campos
  clearFields() {
    this.logisticaData = {
      fcReferencia: '',
      fcDesciripcion: '',
      fdtLogisticaEnvio: '',
      fcLogisticaObs: '',
      fcVersion: ''
    };
  }

  // Método para mostrar el mensaje de éxito
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Datos guardados correctamente', // Mensaje del toast
      duration: 2000, // Duración en milisegundos
      position: 'top', // Posición del toast en la pantalla
      color: 'success', // Color del toast (puedes usar 'success', 'danger', 'warning', etc.)
    });
    toast.present();
  }

  async showDeniedToast() {
    const toast = await this.toastController.create({
      message: 'Datos no guardados', // Mensaje del toast
      duration: 2000, // Duración en milisegundos
      position: 'top', // Posición del toast en la pantalla
      color: 'danger', // Color del toast (puedes usar 'success', 'danger', 'warning', etc.)
    });
    toast.present();
  }

  async showPopup(message: string, header: string) {
    const alert = await this.alertController.create({
      header, // Título del popup
      message, // Mensaje dinámico
      buttons: ['OK'], // Botones del popup
    });
    await alert.present();
  }

  // Guardamos los datos cuando el usuario hace clic en el botón de guardar
  async saveChanges() {
    console.log('Guardando los siguientes datos:', this.logisticaData);

    if(this.logisticaData.fcReferencia !== "" && this.logisticaData.fcDesciripcion !== "" && this.logisticaData.fdtLogisticaEnvio !== ""){
      try {
        //Guardo los datos
        await this.generalService.createResource(this.logisticaData);

        //Envio email creación
        // Llamar al servicio para enviar el correo
        await this.generalService.enviarEmail(
          this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "DISEÑO").fcEmailLista, // TO
          '-', // BCC
          this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "ADMIN").fcEmailLista, // CC
          `Nuevo Registro de Logística. Referencia: ${this.logisticaData.fcReferencia}, Versión: ${this.logisticaData.fcVersion}`, // SUBJECT
          `Referencia: ${this.logisticaData.fcReferencia}-${this.logisticaData.fcVersion}, Descripción: ${this.logisticaData.fcDesciripcion.replace(/\//g, ' ').replace(/\%/g, ' ')}`, // TEXT
          `<p>Referencia: ${this.logisticaData.fcReferencia}-${this.logisticaData.fcVersion}, Descripción: ${this.logisticaData.fcDesciripcion.replace(/\//g, ' ').replace(/\%/g, ' ')}<_p><p>Logística Envío: ${this.logisticaData.fdtLogisticaEnvio}, Observaciones: ${this.logisticaData.fcLogisticaObs}<_p>`, // BODY
          '-', // ADJUNTO
          'Logistica', // CODUSUARIO
          this.logisticaData.fdtLogisticaEnvio, // FECHAINICIO
          new Date().toISOString() // FECHAFIN
        );

        console.log('Datos guardados correctamente');
        this.showSuccessToast();
        this.clearFields(); // Limpia los campos después de guardar
        this.router.navigate(['/home/general']);

      } catch (error) {
        console.error('Error al guardar los datos:', error);
        this.showDeniedToast();
      }
    } else {
      this.showPopup('Por favor, complete todos los campos obligatorios', 'Error');
    };

  }

  async onReferenciaBlur(event: any) {
    console.log('Obtengo la descipción de:', this.logisticaData.fcReferencia);
    if(event.target.value){
      try {
        this.datos = await this.generalService.getDescripcionArticulo(event.target.value);
        this.logisticaData.fcDesciripcion = this.datos[0].RESULTADOS;
        console.log('Descripción obtenida correctamente');
      } catch (error) {
        console.error('Descripción no obtenida:', error);
      }
    };
  }

}
