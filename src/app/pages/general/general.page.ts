import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/handler.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';  // Importamos el servicio
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  generalData: any[] = []; // Variable para almacenar los datos
  loading = true; // Indicador de carga
  error: string | null = null; // Mensaje de error
  selectedRow: number | null = null; // Rastrea la fila seleccionada
  filteredData: any[] = []; // Datos filtrados
  sortColumn: string = ''; // Columna actualmente ordenada
  sortColumnAux: string = ''; // Columna ultima ordenada
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de orden actual
  role: string | null = null;

  // Propiedades para los filtros
  filters = {
    fcId: '',
    fcReferencia: '',
    fcDesciripcion: '',
    fdtLogisticaEnvio: '',
    fbDisenoRevisado: '',
    fbCalidadRevisado: '',
    fbLaboratorioRevisado: '',
  };

  constructor(private generalService: GeneralService, private navCtrl: NavController, private sharedDataService: SharedDataService,
              private authService: AuthService, private router: Router) {}

  async ngOnInit() {

    //Ordeno por fecha envío logística desc.
    this.sortColumn = 'fdtLogisticaEnvio'; // Columna por defecto
    //await this.loadGeneralData();
    this.role = this.authService.getRole();
  }

  async ionViewWillEnter() {
    this.sharedDataService.clearDataDiseno();
    this.sharedDataService.clearDataCalidad();
    this.sharedDataService.clearDataLaboratorio();
    this.sortColumn = 'fdtLogisticaEnvio'; // Columna por defecto
    await this.loadGeneralData();
    this.role = this.authService.getRole();
    this.selectedRow = null;
  }

  // Método para cargar los datos
  async loadGeneralData() {
    this.loading = true;
    this.error = null;
    try {
      await this.generalService.getGeneralData().then(data => {
        this.generalData = data;
        this.filteredData = this.generalData;
        if(this.sortColumn !== this.sortColumnAux){
          this.sortData(this.sortColumn);
          this.sortColumnAux = this.sortColumn;
        };
        console.log('Datos obtenidos:', this.generalData);
      });

    } catch (error) {
      this.error = "Error al cargar los datos.";
    } finally {
      this.loading = false;
    }
  }

  // Alternar detalles de la fila seleccionada
  toggleDetails(index: number) {
    this.selectedRow = this.selectedRow === index ? null : index;
  }

  // Aplica los filtros
  applyFilters() {
    this.filteredData = this.generalData.filter((item) => {
      return (
        (!this.filters.fcReferencia ||
          item.fcReferencia
            .toLowerCase()
            .includes(this.filters.fcReferencia.toLowerCase())) &&
        (!this.filters.fcDesciripcion ||
          item.fcDesciripcion
            .toLowerCase()
            .includes(this.filters.fcDesciripcion.toLowerCase())) &&
        (!this.filters.fdtLogisticaEnvio ||
          new Date(item.fdtLogisticaEnvio)
            .toLocaleDateString('es-ES')
            .includes(this.filters.fdtLogisticaEnvio)) &&
        (this.filters.fbDisenoRevisado === '' ||
          item.fbDisenoRevisado === JSON.parse(this.filters.fbDisenoRevisado)) &&
        (this.filters.fbCalidadRevisado === '' ||
          item.fbCalidadRevisado === JSON.parse(this.filters.fbCalidadRevisado)) &&
        (this.filters.fbLaboratorioRevisado === '' ||
          item.fbLaboratorioRevisado === JSON.parse(this.filters.fbLaboratorioRevisado))
      );
    });
  }

  //Ordena los datos
  sortData(column: string) {
    // Cambia la dirección si la columna es la misma
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    // Ordena los datos
    this.filteredData.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      // Si es una fecha, conviértela en número para comparación
      if (valueA instanceof Date || valueB instanceof Date) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      // Si es un booleano, convierte a número (true = 1, false = 0)
      if (typeof valueA === 'boolean' || typeof valueB === 'boolean') {
        valueA = valueA ? 1 : 0;
        valueB = valueB ? 1 : 0;
      }

      // Comparación
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  tratarReferenciaDiseno(id: any, referencia: any, descripcion: any, version: any) {
    const selectedData = { id, referencia, descripcion, version };
    this.sharedDataService.setDataDiseno(selectedData);
    this.navCtrl.navigateForward('/home/diseno');

    /**this.navCtrl.navigateForward('/home/diseno', {
      queryParams: {
        fcReferencia: referencia,
        fcDescripcion: descripcion,
      },
    });*/
  }

  tratarReferenciaCalidad(id: any, referencia: any, descripcion: any, version: any) {
    const selectedData = { id, referencia, descripcion, version };
    this.sharedDataService.setDataCalidad(selectedData);
    this.navCtrl.navigateForward('/home/calidad');
  }

  tratarReferenciaLaboratorio(id: any, referencia: any, descripcion: any, version: any) {
    const selectedData = { id, referencia, descripcion, version };
    this.sharedDataService.setDataLaboratorio(selectedData);
    this.navCtrl.navigateForward('/home/laboratorio');
  }

}
