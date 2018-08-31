import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map,  catchError } from 'rxjs/operators'; // version 6 en adelante
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { throwError,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Propiedades de la clase, para saber si el usuario esta o no autenticado
  usuario: Usuario;
  token: string;
  menu: any[]= [];
  constructor(public http: HttpClient, public router: Router,
  public _subirArchivoService: SubirArchivoService) {
    // lo ejecutamos cada ves que el servicio de inicializa
    this.cargarStorage();
  }


  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

  // no hacemos la suscripcion aqui, solo retornamos la peticion
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      })
      ,
      catchError( err => {

        this.router.navigate(['/login']);

        swal('No se pudo renovar el token','No fue posible renovar token','error');
  
        return throwError(err);
       } )
    );
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
     if( localStorage.getItem('token'))  {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse( localStorage.getItem('usuario'));
       this.menu = JSON.parse( localStorage.getItem('menu'));

     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }


  logout() {
    this.usuario = null;
    this.token = '';
    this.menu =[];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(tokenGoogle: string)   {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token: tokenGoogle}).pipe(
      map((resp: any )=> {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
      }) ,
     catchError( err => {
      //  return Observable.throw(err);

      // console.log(err.error);
swal('Errro en el login', err.error.mensaje,'warning');

      return throwError(err);
     } )     
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError (
      'Something bad happened; please try again later.');
  }


  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    // map Rx version 6 en adelante
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError( err => {
        //  return Observable.throw(err);
  
        // console.log(err.error);
  swal(err.error.mensaje, err.error.errors.message,'warning');
  
        return throwError(err);
       } )
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
        const usuarioDB: Usuario = resp.usuario;

        this.guardarStorage(resp.usuario._id, this.token, usuarioDB, this.menu);
    }
 
    swal('Usuario Actualizado', usuario.nombre, 'success');

    return true;
   }),
   catchError( err => {
    //  return Observable.throw(err);

    // console.log(err.error);
swal(err.error.mensaje, err.error.errors.message,'warning');

    return throwError(err);
   } )
 );

}

cambiarImagen(archivo: File, id: string) {

  this._subirArchivoService.subirArchivo(archivo, 'usuarios',id)
  .then( (resp: any) => {
    // console.log(resp);
    this.usuario.img = resp.usuario.img;
    swal('Imagen Actualizada', this.usuario.nombre, 'success');

    this.guardarStorage(id, this.token, this.usuario, this.menu);
  })
  .catch( err => {
    console.log(err);
  });

}

cargarUsuarios(desde: number = 0) {
  
  const url = URL_SERVICIOS + '/usuario?desde='+ desde;
  return this.http.get(url);

}

buscarUsuarios( termino: string) {
 
  const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

  return this.http.get(url).pipe(
    map((resp: any) => {
     return  resp.usuario;
    })
  );
}


borrarUsuario(id) {
  
  const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

  return this.http.delete(url).pipe(
    map(resp => {

      swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    })
  );
}


}
