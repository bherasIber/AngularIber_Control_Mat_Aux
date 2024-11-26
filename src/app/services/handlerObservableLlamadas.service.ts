import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/handlerObservable.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  generalData: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.loadGeneralData();
  }

  // Método para cargar datos
  loadGeneralData() {
    this.loading = true;
    this.error = null;

    this.generalService.getGeneralData().subscribe({
      next: (response) => {
        this.generalData = response.data; // Accede a la propiedad data
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos';
        console.error(err);
        this.loading = false;
      },
    });
  }

  // Crear un nuevo recurso
  createResource() {
    const newData = { nombre: 'Nuevo', descripcion: 'Recurso creado' };
    this.generalService.createResource(newData).subscribe({
      next: (response) => {
        console.log('Recurso creado:', response.data);
        this.loadGeneralData(); // Refrescar datos
      },
      error: (err) => console.error('Error al crear el recurso:', err),
    });
  }

  // Actualizar un recurso completo
  updateResource(id: string) {
    const updatedData = { nombre: 'Actualizado', descripcion: 'Descripción nueva' };
    this.generalService.updateResource(id, updatedData).subscribe({
      next: (response) => console.log('Recurso actualizado:', response.data),
      error: (err) => console.error('Error al actualizar el recurso:', err),
    });
  }

  // Actualizar parcialmente un recurso
  partialUpdateResource(id: string) {
    const partialData = { descripcion: 'Descripción parcial' };
    this.generalService.partialUpdateResource(id, partialData).subscribe({
      next: (response) => console.log('Recurso actualizado parcialmente:', response.data),
      error: (err) => console.error('Error al actualizar parcialmente:', err),
    });
  }

  // Eliminar un recurso
  deleteResource(id: string) {
    this.generalService.deleteResource(id).subscribe({
      next: (response) => {
        console.log('Recurso eliminado:', response.data);
        this.loadGeneralData(); // Refrescar datos
      },
      error: (err) => console.error('Error al eliminar el recurso:', err),
    });
  }

  //Trabajar directamente con los datos, no con el objeto.
  this.generalService.getGeneralDataMap().subscribe((data) => {
    this.generalData = data;
  });
}