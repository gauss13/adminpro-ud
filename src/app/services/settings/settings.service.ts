import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaurl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjuste()
  {
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes()
  {
    if(localStorage.getItem('ajustes'))
    {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
this.aplicarTema(this.ajustes.tema);
    }
  }

aplicarTema(tema: string)
{
  const url = `assets/css/colors/${tema}.css`;
  this._document.getElementById('tema').setAttribute('href', url);
  
  this.ajustes.temaurl = url;
  this.ajustes.tema = tema;
  this.guardarAjuste();
}



}
interface Ajustes {
temaurl: string,
tema: string 
}