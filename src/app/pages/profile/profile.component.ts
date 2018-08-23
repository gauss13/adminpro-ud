import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, SubirArchivoService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
 
// Si el usuario no es de google, entonces si se actualizará el correo
    if(!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

this._usuarioService.actualizarUsuario(this.usuario)
.subscribe();

  }

  seleccionImagen(event)   {

    if(event === 'undefined') {
      this.imagenSubir = null;
      return;
    } 
    

    if( event.target.files[0].type.indexOf('image') < 0 ) {
swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
this.imagenSubir = null;

return;

    }

    this.imagenSubir = event.target.files[0];

    // JS puro
    const reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend= () => {
      // console.log(reader.result);
      this.imagenTemp = reader.result; // devuelve una imagen en base64
    };

    // console.log(event.target.files[0]);

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
