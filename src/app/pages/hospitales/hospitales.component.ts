import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Title } from '@angular/platform-browser';


declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
      
    this.cargarHospitales();

    
    // queremos estar subscritos a cualquier emision de notificacion del modalUploadService
    this._modalUploadService.notificacion
    .subscribe(resp => {
      this.cargarHospitales();
    });

  }


  buscarHospital(termino) {

    if( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    
    this.cargando = true;
    
      this._hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[]) => {

        this.hospitales = hospitales;
        this.cargando = false;
    
      });

  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {    

      this.totalRegistros = this._hospitalService.totalHospitales;// total
      this.hospitales = resp;
      this.cargando = false;   
    
    });

  }

  mostrarModal(id: string)   {

    this._modalUploadService.mostrarModal('hospitales',id);

  }

  guardarHospital(hospital: Hospital)  {
    this._hospitalService.actualizarHospital( hospital)
    .subscribe();
  }

borrarHospital(hospital: Hospital) {


swal( {
  title: '¿Esta seguro ?',
  text: 'Esta a punto de borrar al hospital ' + hospital.nombre,
  icon: 'warning',
  buttons: true,
  dangerMode: true,
})
.then((confirmacion) => {

  if(confirmacion) {
      this._hospitalService.borrarHospital( hospital._id)
            .subscribe( borrado => {
            this.cargarHospitales();
          });
  }

});

}

// ======================================================
//  Crear y sweet alert
// ======================================================
creaeHospital() {

swal({
  title: 'Crear Hospital',
  text: 'Ingrese el nombre del hospital',
  content: 'input',
  icon: 'info',
  buttons: true,
  dangerMode: true
}).then( (valor: string) => {


  if( !valor || valor.length <= 0 ) {
    return;
    }
    
    
    const item:  Hospital = {
      nombre: valor,
      img: null
    };
    
    
    this._hospitalService.crearHospital(item)
    .subscribe(() => this.cargarHospitales());
    
  
});
  
}

}
