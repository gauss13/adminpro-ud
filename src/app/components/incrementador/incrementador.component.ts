import { element } from 'protractor/built';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

@ViewChild('txtProgress') txtProgres: ElementRef;

  // Valores que recibe desde el hijo
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  
 // Valores que enviará al hijo
 // Se enviara un evento
 @Output() eventCambioValor: EventEmitter<number> = new EventEmitter();



  constructor() { 
   // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  
onChanges(newValue: number) {

  // obtenemos el input con el name= progreso, tambien se puede hacer por el id
  // la funcion regresa todos los elementos que coiciden con el name
// para indicar que queremos usar el primero usamos [0], que este caso era el unico
// let elemHtml: any = document.getElementsByName('progreso')[0];


console.log(this.txtProgres);


if(newValue >= 100){
this.progreso = 100;
}
else if(newValue <= 0){
this.progreso = 0;
}
else {
  this.progreso = newValue;
}

// con esto reasignamos el valor a input min 0 y maximo 100
// elemHtml.value = Number(this.progreso);
this.txtProgres.nativeElement.value = this.progreso;


this.eventCambioValor.emit(this.progreso);


}

  cambiarValor(valor: number)
  {

    if(this.progreso >= 100 && valor > 0)
    {
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0)
    {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;

    this.eventCambioValor.emit(this.progreso);

    this.txtProgres.nativeElement.focus();
  }

}
