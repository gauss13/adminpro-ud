import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

// Esta funcion sirve para subir cualquier tipo de archivo
subirArchivo(archivo: File, tipo: string, id: string) {

// envolvemos el codigo en una promesa para retornar un valor 
// a las paginas avisando que se termino el guardado del archivo

return new Promise((resolve, reject)=> {

// se realiza de esta manera por que angular no tiene libreria para subir archivo
// por lo tanto se tiene que hacer por medio de javascript puro
  let formData = new FormData();
  let xhr = new XMLHttpRequest();

// llenamos el objeto formData con los valores a enviar
formData.append('imagen', archivo, archivo.name);

// CONFIGURACION
// configurar la peticion ajax,  solo es la configuracio
// es similar a un observable que estara recibiendo informacion 
// cada ves que el estado cambie
xhr.onreadystatechange = function() {
  // mientras se esta subiendo, se podria poner loading o similar
  if(xhr.readyState === 4)  {
      if( xhr.status === 200) {
        console.log('Imagen subida');
        resolve( JSON.parse( xhr.response));
      } else {
        console.log('Fallo la subida');
        reject( xhr.response);
      }      
  }
};//

// creamos la url de la peticion del ajax
let url = URL_SERVICIOS + '/upload/'+ tipo + '/' + id;


// ejcutamos el ajax
xhr.open('PUT',url, true);
xhr.send(formData);


} );


}

}
