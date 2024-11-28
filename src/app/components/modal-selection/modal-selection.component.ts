import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../../services/handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-selection',
  templateUrl: './modal-selection.component.html',
  styleUrls: ['./modal-selection.component.scss'],
})
export class ModalSelectionComponent implements OnInit {
  @Input() rol!: string; // Parámetro recibido desde las páginas
  public items: any[] = [];
  role: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private generalService: GeneralService,
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.loadData();
    this.role = this.authService.getRole(); //Obtengo el rol que está conectado
  }

  async loadData() {
    try {
      console.log(this.rol)
      this.items = await this.generalService.getGeneralData();
      if (this.rol === "diseño"){
        // Filtrar los elementos
        this.items = this.items.filter((item: any) =>
          item.fdtLogisticaEnvio && !item.fdtDisenoRecibido
        );
      } else if (this.rol === "calidad"){
        // Filtrar los elementos
        this.items = this.items.filter((item: any) =>
          item.fdtDisenoEnvio && !item.fdtCalidadRecibido && item.fbDisenoRevisado === true
        );
      } else if (this.rol === "laboratorio"){
        // Filtrar los elementos
        this.items = this.items.filter((item: any) =>
          item.fdtCalidadEnvio && !item.fdtLaboratorioRecibido && item.fbCalidadRevisado === true
        );
      };
    } catch (error) {
      console.error('Error al cargar datos del modal:', error);
    }
  }

  closeModal(selectedItem?: any) {
    this.modalCtrl.dismiss(selectedItem);
    //this.router.navigate(['/home/general']);
  }
}
