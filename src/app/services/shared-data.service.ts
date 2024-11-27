import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // Definimos la variable con los campos solicitados
  private listaEmailDataSource = new BehaviorSubject<any[]>([{
    fcTipoLista: '',  // Inicializamos como cadena vacía
    fcEmailLista: '', // Inicializamos como cadena vacía
    fbActiva: false   // Inicializamos como falso
  }]);
  listaEmailData = this.listaEmailDataSource.asObservable();  // Exponemos el observable

  //Datos de diseño
  private dataDiseno: any;

  //Datos de calidad
  private dataCalidad: any;

   //Datos de laboratorio
   private dataLaboratorio: any;

  constructor() { }

  // Método para establecer el valor de la variable
  setListaEmailData(data: any[]) {
    this.listaEmailDataSource.next(data);  // Actualiza la variable con el nuevo valor
  }

  // Método para obtener el valor actual de la variable
  getListaEmailData() {
    return this.listaEmailDataSource.getValue();  // Obtiene el valor actual
  }

  // Método para obtener un valor filtrado por `fcTipoLista`
  getValueByTipoLista(tipoLista: string) {
    const data = this.listaEmailDataSource.getValue();
    return data.find(item => item.fcTipoLista === tipoLista); // Filtra por tipo de lista
  }

   // Setter para guardar los datos diseño
   setDataDiseno(value: any): void {
    this.dataDiseno = value;
  }

  // Getter para obtener los datos diseño
  getDataDiseno(): any {
    return this.dataDiseno;
  }

  // Método para limpiar los datos diseño
  clearDataDiseno(): void {
    this.dataDiseno = null;
  }

   // Setter para guardar los datos Calidad
   setDataCalidad(value: any): void {
    this.dataCalidad = value;
  }

  // Getter para obtener los datos Calidad
  getDataCalidad(): any {
    return this.dataCalidad;
  }

  // Método para limpiar los datos Calidad
  clearDataCalidad(): void {
    this.dataCalidad = null;
  }

   // Setter para guardar los datos Laboratorio
   setDataLaboratorio(value: any): void {
    this.dataLaboratorio = value;
  }

  // Getter para obtener los datos Laboratorio
  getDataLaboratorio(): any {
    return this.dataLaboratorio;
  }

  // Método para limpiar los datos Laboratorio
  clearDataLaboratorio(): void {
    this.dataLaboratorio = null;
  }
}
