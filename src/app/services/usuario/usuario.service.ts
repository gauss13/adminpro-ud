import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators'; // version 6 en adelante
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Propiedades de la clase, para saber si el usuario esta o no autenticado
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router,
  public _subirArchivoService: SubirArchivoService) {
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

actualizarUsuario(usuario: Usuario) {
  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

 return this.http.put(url, usuario ).pipe(
   map((resp: any) => {
    
    // si el usuario de la sesion es el mismo que actualizo sus datos
    // entonces carganos los datos a local storage
    if ( usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;

        this.guardarStorage(resp.usuario._id, this.token, usuarioDB);
    }
 
    swal('Usuario Actualizado', usuario.nombre, 'success');

    return true;
   })
 );

}

cambiarImagen(archivo: File, id: string) {

  this._subirArchivoService.subirArchivo(archivo, 'usuarios',id)
  .then( (resp: any) => {
    // console.log(resp);
    this.usuario.img = resp.usuario.img;
    swal('Imagen Actualizada', this.usuario.nombre, 'success');

    this.guardarStorage(id, this.token, this.usuario);
  })
  .catch( err => {
    console.log(err);
  });

}

cargarUsuarios(desde: number = 0) {
  
  let url = URL_SERVICIOS + '/usuario?desde='+ desde;
  return this.http.get(url);

}

buscarUsuarios( termino: string) {
 
  let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

  return this.http.get(url).pipe(
    map((resp: any) => {
     return  resp.usuario;
    })
  );
}


borrarUsuario(id) {
  let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

  return this.http.delete(url).pipe(
    map(resp => {

      swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    })
  );
}


}
