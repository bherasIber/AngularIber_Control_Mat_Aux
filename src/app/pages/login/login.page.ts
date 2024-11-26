import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private modalController: ModalController, private authService: AuthService, private router: Router) {}

  //ngOnInit() { }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      // Login exitoso, cierra el modal con un indicador de éxito
      this.modalController.dismiss({ authenticated: true });
    } else {
      alert('Credenciales inválidas');
    }
  }

  closeModal() {
    // Cierra el modal sin éxito
    this.modalController.dismiss({ authenticated: false });
  }
}
