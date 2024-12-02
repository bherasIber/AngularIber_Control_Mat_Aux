import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private baseUrl = 'http://servercanon.ibercacao.local:7005'; // Cambia a la URL de tu API
  axiosInstance: any;

  constructor() {}

  // Método para obtener datos del web service get
  async getGeneralData(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/getRevisionMaterial`);
      return response.data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos del web service', error);
      throw error;
    }
  }

  //ejemplo: LLamada al metodo anterior para get, utilizar en la clase que se requiera, no aqui.
  /**
  // Método para obtener datos get
  async loadGeneralData() {
    this.loading = true;
    this.error = null;
    try {
      this.generalData = await this.generalService.getGeneralData();
      console.log('Datos obtenidos:', this.generalData);
    } catch (error) {
      this.error = "Error al cargar los datos.";
    } finally {
      this.loading = false;
    }
  }
    */

  //Método de cracion post
  async createResource(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/crearRevisionMaterial`, data);
      return response.data; // Retorna los datos del recurso creado
    } catch (error) {
      console.error('Error al crear el recurso', error);
      throw error;
    }
  }
  /**
  //Ejemplo post:
  const nuevoRecurso = { nombre: 'Ejemplo', descripcion: 'Descripción del ejemplo' };
  this.generalService.createResource(nuevoRecurso).then(response => {
    console.log('Recurso creado:', response);
  });
  */

  //Metodo para reemplazar un dato put
  async updateResource(id: string, data: any, role: any): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/actualizarRevisionMaterial/${id}/${role}`, data);
      return response.data; // Retorna los datos del recurso actualizado
    } catch (error) {
      console.error('Error al actualizar el recurso', error);
      throw error;
    }
  }

  /* //Ejemplo put:
  const datosActualizados = { nombre: 'Nuevo Nombre', descripcion: 'Nueva descripción' };
  this.generalService.updateResource('123', datosActualizados).then(response => {
    console.log('Recurso actualizado:', response);
  }); */

  //Actualizar un registro parcialmente patch
  async partialUpdateResource(id: string, data: any): Promise<any> {
    try {
      const response = await axios.patch(`${this.baseUrl}/ruta-endpoint/${id}`, data);
      return response.data; // Retorna los datos del recurso actualizado parcialmente
    } catch (error) {
      console.error('Error al actualizar parcialmente el recurso', error);
      throw error;
    }
  }

  /* //Ejempolo actulizar algunos registros patch:
  const datosParciales = { descripcion: 'Descripción actualizada' };
  this.generalService.partialUpdateResource('123', datosParciales).then(response => {
    console.log('Recurso actualizado parcialmente:', response);
  }); */

  //Borrar un registro delete:
  async deleteResource(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/ruta-endpoint/${id}`);
      return response.data; // Retorna la confirmación o datos relacionados con la eliminación
    } catch (error) {
      console.error('Error al eliminar el recurso', error);
      throw error;
    }
  }

/*   //Ejemplo borrar:
  this.generalService.deleteResource('123').then(response => {
    console.log('Recurso eliminado:', response);
  }); */

  // Método para obtener datos descipción de un artículo.
  async getDescripcionArticulo(referencia: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/getDatoFuncion/ZMFMM_WM_MATNR/MAKTX&${referencia}&MAKT`);
      return response.data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos del web service', error);
      throw error;
    }
  }

  // Método para obtener datos descipción de un artículo.
  async getVersionArticulo(referencia: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/getDatoFuncion/ZMM_GET_CHAR_VERSION_MATERIAL/${referencia}`);
      return response.data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos del web service', error);
      throw error;
    }
  }


  //Enviar Email.
  async enviarEmail(
    to: string,
    bcc: string,
    cc: string,
    subject: string,
    text: string,
    body: string,
    adjunto: string,
    codUsuario: string,
    fechaInicio: string,
    fechaFin: string
  ): Promise<any> {
        
    const url = `${this.baseUrl}/enviarEmail/` + 
      encodeURIComponent(to) + '/' +
      encodeURIComponent(bcc) + '/' +
      encodeURIComponent(cc) + '/' +
      encodeURIComponent(subject) + '/' +
      encodeURIComponent(text) + '/' +
      encodeURIComponent(body) + '/' +
      encodeURIComponent(adjunto) + '/' +
      encodeURIComponent(codUsuario) + '/' +
      encodeURIComponent(fechaInicio) + '/' +
      encodeURIComponent(fechaFin);
    try {
      const response = await axios.get(url);
      return response.data; // Regresa los datos en caso de éxito
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error; // Manejar errores desde el componente
    }
      
  }

  // Método para obtener datos del web service get
  async getEmailData(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/getListaEmail`);
      return response.data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos del web service', error);
      throw error;
    }
  }

}
