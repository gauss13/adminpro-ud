import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  /**
   *
   */
  constructor(
    public _usuarioService: UsuarioService,
  public router: Router) {
 
    
  }

  canActivate( ):  Promise<boolean> | boolean {

const token = this._usuarioService.token;

// recuerar la fecha de expiracion
const payload = JSON.parse( atob(token.split('.')[1]));


const expirado = this.expirado(payload.exp);


if ( expirado ) {
  this.router.navigate(['/login']);
  return false;
}

    return this.verificaRenueva( payload.exp );
}


verificaRenueva(fechaExp: number): Promise<boolean> {

  return new Promise((resolve, reject) => {

// obtenemos la fecha de expiracion del token y lo convertimos a segundo
const tokenExp = new Date(fechaExp * 1000);
// obtenemos la fecha actual
const ahora = new Date();



// a la fecha actual le incrementamos una hora
// para renovar el token una hora antes que expire
ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );



if ( tokenExp.getTime() > ahora.getTime() ) {
  resolve(true);
} else {

  this._usuarioService.renuevaToken()
  .subscribe( () => {
    resolve(true);
    
  }, () => {
   
    reject(false);
    this.router.navigate(['/login']);
    
  });

}



resolve(true);
    
  });

}

  expirado( fechaExp: number) {
    // obtenemos la hora del sistema y lo convertimos a segundos dividiendolo entre 1000
    let ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }


}
