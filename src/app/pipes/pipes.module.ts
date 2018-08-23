import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';


// export indica que pipes se usaran fuera de este modulo
@NgModule({
  imports: [],
  declarations: [ImagenPipe],
  exports:[ImagenPipe]
})
export class PipesModule { }
