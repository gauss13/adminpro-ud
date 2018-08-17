import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;
  constructor() { }

  ngOnInit() {
  }

// actualizar(event: number) {
// console.log('evento: ', event);
// this.progreso1 = event;

// }


  // cambiarValor(valor: number)
  // {

  //   if(this.progreso >= 100 && valor > 0)
  //   {
  //     this.progreso = 100;
  //     return;
  //   }

  //   if(this.progreso <= 0 && valor < 0)
  //   {
  //     this.progreso = 0;
  //     return;
  //   }

  //   this.progreso += valor;
  // }

}
