import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/handler.service';
import { SharedDataService } from '../../services/shared-data.service';  // Importamos el servicio
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { ModalSelectionComponent } from 'src/app/components/modal-selection/modal-selection.component';


@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.page.html',
  styleUrls: ['./calidad.page.scss'],
})
export class CalidadPage implements OnInit {

  calidadForm: FormGroup = this.fb.group({});
  mensajeEmergente: string | null = null;
  role: string | null = null;
  fcId: string = '';
  fcVersion: string = '00';
  listaEmailData: any;
  para: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private sharedDataService: SharedDataService,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    // Inicializar el formulario
    this.calidadForm = this.fb.group({
      fcReferencia: ['', Validators.required],
      fcDescripcion: ['', Validators.required],
      fdtCalidadRecibido: ['', Validators.required],
      fbCalidadRevisado: ['', Validators.required],
      fdtCalidadRevisado: ['', Validators.required],
      fdtCalidadEnvio: ['', Validators.required],
      fcCalidadObs: ['', Validators.maxLength(200)],
    });

    //Obtengo el rol que está conectado
    this.role = this.authService.getRole(); //Obtengo el rol que está conectado

    //Obtengo los datos de la referencia a tratar
    const data = this.sharedDataService.getDataCalidad();
    if (data) {

      this.calidadForm.patchValue({
        fcReferencia: data.referencia,
        fcDescripcion: data.descripcion,
      });

      this.fcId = data.id;
      this.fcVersion = data.version;

    } else {
      // Si no hay datos, redirigir o manejar el estado de error
      console.error('No se encontraron datos compartidos.');
    }

    this.listaEmailData = this.sharedDataService.getListaEmailData();

    // Obtener parámetros de la URL
    /**this.route.queryParams.subscribe((params) => {
      this.disenoForm.patchValue({
        fcReferencia: params['fcReferencia'],
        fcDescripcion: params['fcDescripcion'],
      });
    });
    */
  }

  async ionViewWillEnter() {
    const data = this.sharedDataService.getDataCalidad();
    if (data) {

      this.calidadForm.patchValue({
        fcReferencia: data.referencia,
        fcDescripcion: data.descripcion,
      });

      this.fcId = data.id;
      this.fcVersion = data.version;

    } else {
      // Si no hay datos, redirigir o manejar el estado de error
      console.error('No se encontraron datos compartidos.');
      this.openModal();
    }
  }

  async openModal() {
    const topModal = await this.modalCtrl.getTop(); // Obtiene el modal actual (si hay uno)
    if (topModal) {
      console.log('El modal ya está abierto.');
      return; // Evita abrir otro modal
    };

    const modal = await this.modalCtrl.create({
      component: ModalSelectionComponent,
      componentProps: { rol: "calidad" }, // Pasar el rol correspondiente
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Elemento seleccionado:', data);
      // Realiza la lógica con el elemento seleccionado
      this.calidadForm.patchValue({
        fcReferencia: data.fcReferencia,
        fcDescripcion: data.fcDesciripcion,
      });

      this.fcId = data.fcId;
      this.fcVersion = data.fcVersion;
    } else {
      this.sharedDataService.clearDataCalidad();
      this.router.navigate(['/home/general']);
    }
  }

  async guardarDatos() {
    if (this.calidadForm.valid) {
      const formData = this.calidadForm.value;
      const id = this.fcId;

      const cc = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "ADMIN").fcEmailLista;

      formData.fdtCalidadRecibido = formData.fdtCalidadRecibido.length <= 16 ? (formData.fdtCalidadRecibido +  ":00") : formData.fdtCalidadRecibido;
      formData.fdtCalidadRevisado = formData.fdtCalidadRevisado.length <= 16 ? (formData.fdtCalidadRevisado +  ":00") : formData.fdtCalidadRevisado;
      formData.fdtCalidadEnvio = formData.fdtCalidadEnvio.length <= 16 ? (formData.fdtCalidadEnvio +  ":00") : formData.fdtCalidadEnvio;


      if (formData.fcCalidadObs.length <= 0)
        formData.fcCalidadObs = "-";

      this.generalService
        .updateResource(id, formData, this.role)
        .then((response) => {
          console.log('Datos guardados:', response);
          this.mensajeEmergente = '¡Datos guardados correctamente!';

          if(formData.fbCalidadRevisado === 'true'){
            this.para = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "LABORATORIO").fcEmailLista;
            //Envio email actualización
            // Llamar al servicio para enviar el correo
            this.generalService.enviarEmail(
              this.para, // TO
              '-', // BCC
              cc, // CC
              `Registro actualizado desde Calidad, satisfactorio. Referencia: ${formData.fcReferencia}-${this.fcVersion}`, // SUBJECT
              `Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}`, // TEXT
              `<p>Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}<_p><p>Calidad Envío: ${formData.fdtCalidadEnvio}, Observaciones: ${formData.fcCalidadObs}<_p>`, // BODY
              '-', // ADJUNTO
              'Calidad', // CODUSUARIO
              formData.fdtCalidadEnvio, // FECHAINICIO
              new Date().toISOString() // FECHAFIN
            );
          } else {
            this.para = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "DISEÑO").fcEmailLista;
            //Envio email actualización
            // Llamar al servicio para enviar el correo
            this.generalService.enviarEmail(
              this.para, // TO
              '-', // BCC
              cc, // CC
              `Registro actualizado desde Calidad rechazado. Referencia: ${formData.fcReferencia}-${this.fcVersion}`, // SUBJECT
              `Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}`, // TEXT
              `<p>Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}<_p><p>Calidad Envío: ${formData.fdtCalidadEnvio}, Observaciones: ${formData.fcCalidadObs}<_p>`, // BODY
              '-', // ADJUNTO
              'Calidad', // CODUSUARIO
              formData.fdtCalidadEnvio, // FECHAINICIO
              new Date().toISOString() // FECHAFIN
            );
          };

          this.limpiarFormulario();
          this.router.navigate(['/home/general']);

        })
        .catch((error) => {
          console.error('Error al guardar:', error);
          this.mensajeEmergente = 'Error: Por favor, completa todos los campos obligatorios.';

        });
    }
  }

  limpiarFormulario() {
    const referencia = this.calidadForm.get('fcReferencia')?.value;
    const descripcion = this.calidadForm.get('fcDescripcion')?.value;

    this.calidadForm.reset();

    // Mantener referencia y descripción
    this.calidadForm.patchValue({
      fcReferencia: referencia,
      fcDescripcion: descripcion,
    });
  }

  cerrarPopup() {
    this.mensajeEmergente = null;
  }
}
