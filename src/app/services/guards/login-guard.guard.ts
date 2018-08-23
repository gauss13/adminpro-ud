import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }

  canActivate():  boolean {

    if( this._usuarioService.estaLogueado()) {
console.log('PASO EL GUARD');
return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

    // console.log('Paso por el login Guard');

  }
}
