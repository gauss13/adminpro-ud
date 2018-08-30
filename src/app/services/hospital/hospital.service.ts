import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';

import { map } from 'rxjs/operators'; // version 6 en adelante
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;
  totalHospitales: number = 0;

  constructor(public http: HttpClient, public router: Router,
    public _subirArchivoService: SubirArchivoService) { 

    // Lo ejecutamos cada ves que el servicio se inicialice
    this.cargarStorage();
  }


  cargarStorage() {
    if( localStorage.getItem('token'))  {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';    
    }
 }

  cargarHospitales()  {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url).pipe(
      map((resp: any)=> {

        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospitales(id: string)   {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url);

  }

// ======================================================
// Borrar un Hospital
// ======================================================
  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(resp => {
  
        swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
        return true;
      })
    );
  }

  

// ======================================================
// Crear Hospital
// ======================================================
crearHospital(hospital: Hospital) {

  const url = URL_SERVICIOS + '/hospital' + '?token=' + this.token;

  // map Rx version 6 en adelante
  return this.http.post(url, hospital).pipe(
    map((resp: any) => {
      swal('Hospital creado', hospital.nombre, 'success');
      return resp.hospital;

    })
  );
}


// ======================================================
// Buscar Hospital
// ======================================================
buscarHospital(termino: string) {

  const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;



  return this.http.get(url).pipe(
    map((resp: any) => {
     return  resp.hospital;
    })
  );

}

// ======================================================
// Actualizar Hospital
// ======================================================
actualizarHospital(hospital: Hospital) {

  let url = URL_SERVICIOS + '/hospital/' + hospital._id;
  url += '?token=' + this.token;

console.log(url);

 return this.http.put(url, hospital ).pipe(
   map((resp: any) => {    
 
    swal('Hospital Actualizado', hospital.nombre, 'success');

    return true;
   })
 );
}

}

