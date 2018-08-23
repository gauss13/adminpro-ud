import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email: string;
recuerdame: boolean = false;

auth2: any;

constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2',() => {
      this.auth2 = gapi.auth2.init({
        client_id: '328227878063-lfd1ku7iudjj8nsu620b0idna0n978jr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' });

        // cargamos el evento del boton
        this.attachSignin(document.getElementById('btnGoogle'));

    });

  }  

  attachSignin(elementoHtml) {
    this.auth2.attachClickHandler(elementoHtml,{},(googleUser) => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);

// lo que usaremos en realidad es el token
const token = googleUser.getAuthResponse().id_token;

this._usuarioService.loginGoogle(token).subscribe(()=> {

  // redireccion por angular
  // this.router.navigate(['/dashboard']);

  // pero el diseño mostraba un error 
  // al nomostrar los estilo de forma correcta
  // por esa razon haremos la redireccion de forma manual
window.location.href = '#/dashboard';

});


    });
  }



  ingresar(forma:  NgForm) {

if(!forma.valid) {
  return;
}

const usuario = new Usuario(null, forma.value.email, forma.value.password);

this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(resp => {

  this.router.navigate(['/dashboard']);

});



// this.router.navigate(['/dashboard']);
  }


}
