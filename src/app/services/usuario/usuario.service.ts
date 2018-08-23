import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators'; // version 6 en adelante
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Propiedades de la clase, para saber si el usuario esta o no autenticado
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    // lo ejecutamos cada ves que el servicio de inicializa
    this.cargarStorage();
    console.log('Servicio de usuario listo');
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
     if( localStorage.getItem('token'))  {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse( localStorage.getItem('usuario'));

     } else {
       this.token = '';
       this.usuario = null;
     }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }


  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(tokenGoogle: string)   {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token: tokenGoogle}).pipe(
      map((resp: any )=> {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );

  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    // map Rx version 6 en adelante
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }
}
