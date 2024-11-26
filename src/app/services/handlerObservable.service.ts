import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private baseUrl = 'https://api.tu-web-service.com'; // Cambia a tu URL base

  constructor() {}

  // GET: Obtener datos
  getGeneralData(): Observable<any> {
    return from(axios.get(`${this.baseUrl}/ruta-endpoint`));
  }

  // POST: Crear un recurso
  createResource(data: any): Observable<any> {
    return from(axios.post(`${this.baseUrl}/ruta-endpoint`, data));
  }

  // PUT: Actualizar un recurso completo
  updateResource(id: string, data: any): Observable<any> {
    return from(axios.put(`${this.baseUrl}/ruta-endpoint/${id}`, data));
  }

  // PATCH: Actualizar parcialmente un recurso
  partialUpdateResource(id: string, data: any): Observable<any> {
    return from(axios.patch(`${this.baseUrl}/ruta-endpoint/${id}`, data));
  }

  // DELETE: Eliminar un recurso
  deleteResource(id: string): Observable<any> {
    return from(axios.delete(`${this.baseUrl}/ruta-endpoint/${id}`));
  }

  // Obtener sólo los datos no el objeto completo:
  getGeneralDataMap(): Observable<any[]> {
    return from(axios.get(`${this.baseUrl}/ruta-endpoint`)).pipe(
      map((response) => response.data) // Extrae solo los datos relevantes
    );
  }
}
