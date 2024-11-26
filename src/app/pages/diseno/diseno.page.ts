import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/handler.service';
import { SharedDataService } from '../../services/shared-data.service';  // Importamos el servicio
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-diseno',
  templateUrl: './diseno.page.html',
  styleUrls: ['./diseno.page.scss'],
})
export class DisenoPage implements OnInit {

  disenoForm: FormGroup = this.fb.group({});
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
  ) {}

  ngOnInit() {
    // Inicializar el formulario
    this.disenoForm = this.fb.group({
      fcReferencia: ['', Validators.required],
      fcDescripcion: ['', Validators.required],
      fdtDisenoRecibido: ['', Validators.required],
      fbDisenoRevisado: ['', Validators.required],
      fdtDisenoRevisado: ['', Validators.required],
      fdtDisenoEnvio: ['', Validators.required],
      fcDisenoObs: ['', Validators.maxLength(200)],
    });

    //Obtengo el rol que está conectado
    this.role = this.authService.getRole(); //Obtengo el rol que está conectado

    //Obtengo los datos de la referencia a tratar
    const data = this.sharedDataService.getDataDiseno();
    if (data) {

      this.disenoForm.patchValue({
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

  async guardarDatos() {
    if (this.disenoForm.valid) {
      const formData = this.disenoForm.value;
      const id = this.fcId;

      const cc = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "ADMIN").fcEmailLista;

      formData.fdtDisenoRecibido = formData.fdtDisenoRecibido +  ":00";
      formData.fdtDisenoRevisado = formData.fdtDisenoRevisado +  ":00";
      formData.fdtDisenoEnvio = formData.fdtDisenoEnvio +  ":00";


      if (formData.fcDisenoObs.length <= 0)
        formData.fcDisenoObs = "-";

      this.generalService
        .updateResource(id, formData, this.role)
        .then((response) => {
          console.log('Datos guardados:', response);
          this.mensajeEmergente = '¡Datos guardados correctamente!';

          if(formData.fbDisenoRevisado === 'true'){
            this.para = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "CALIDAD").fcEmailLista;
            //Envio email actualización
            // Llamar al servicio para enviar el correo
            this.generalService.enviarEmail(
              this.para, // TO
              '-', // BCC
              cc, // CC
              `Registro actualizado desde Diseño, satisfactorio. Referencia: ${formData.fcReferencia}-${this.fcVersion}`, // SUBJECT
              `Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}`, // TEXT
              `<p>Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}<_p><p>Diseño Envío: ${formData.fdtDisenoEnvio}, Observaciones: ${formData.fcDisenoObs}<_p>`, // BODY
              '-', // ADJUNTO
              'Diseño', // CODUSUARIO
              formData.fdtDisenoEnvio, // FECHAINICIO
              new Date().toISOString() // FECHAFIN
            );
          } else {
            this.para = this.listaEmailData.find((item: { fcTipoLista: string; }) => item.fcTipoLista === "LOGISTICA").fcEmailLista;
            //Envio email actualización
            // Llamar al servicio para enviar el correo
            this.generalService.enviarEmail(
              this.para, // TO
              '-', // BCC
              cc, // CC
              `Registro actualizado desde Diseño rechazado. Referencia: ${formData.fcReferencia}-${this.fcVersion}`, // SUBJECT
              `Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}`, // TEXT
              `<p>Referencia: ${formData.fcReferencia}-${this.fcVersion}, Descripción: ${formData.fcDescripcion.toString().replace(/\//g, ' ').replace(/\%/g, ' ')}<_p><p>Diseño Envío: ${formData.fdtDisenoEnvio}, Observaciones: ${formData.fcDisenoObs}<_p>`, // BODY
              '-', // ADJUNTO
              'Diseño', // CODUSUARIO
              formData.fdtDisenoEnvio, // FECHAINICIO
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
    const referencia = this.disenoForm.get('fcReferencia')?.value;
    const descripcion = this.disenoForm.get('fcDescripcion')?.value;

    this.disenoForm.reset();

    // Mantener referencia y descripción
    this.disenoForm.patchValue({
      fcReferencia: referencia,
      fcDescripcion: descripcion,
    });
  }

  cerrarPopup() {
    this.mensajeEmergente = null;
  }
}
