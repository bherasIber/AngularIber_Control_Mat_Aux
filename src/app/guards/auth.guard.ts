import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isModalOpen = false;

  constructor(private authService: AuthService, private router: Router, private modalController: ModalController) {}

  /**canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      const allowedRoles = route.data['roles'] as Array<string>;
      if (allowedRoles && allowedRoles.indexOf(role) === -1) {
        this.router.navigate(['/home/general']);
        return false;
      }
      return true;
    }
    //this.router.navigate(['/login']);
    this.router.navigate(['/home/general']);
    return false;
  }
  **/
  async canActivate(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Promise<boolean> {
    const role = this.authService.getRole();
    const allowedRoles = route.data['roles'] as Array<string>;
    if (this.authService.isLoggedIn()) {
      if (allowedRoles && allowedRoles.indexOf(role) === -1) {
        this.router.navigate(['/home/general']);
        return false;
      }
      return true;
    } else {
      if (!this.isModalOpen) {
        this.isModalOpen = true;
        // Usuario no autenticado, mostrar modal
        const modal = await this.modalController.create({
          component: LoginPage,
          backdropDismiss: false,
        });

        modal.onDidDismiss().then(() => {
          this.isModalOpen = false; // Resetear bandera cuando el modal se cierra
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (data?.authenticated) {
          if (allowedRoles && allowedRoles.indexOf(role) === -1) {
            this.modalController.dismiss({ authenticated: true });
            this.router.navigate(['/home/general']);
            return false;
          }
          return true;
        } else {
          return false; // No permite avanzar sin login
        }
      }
      else {
        return true;
      }
    }
  }
  
}

