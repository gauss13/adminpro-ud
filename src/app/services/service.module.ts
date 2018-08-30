import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService, 
  SharedService, 
  SidebarService, 
  UsuarioService, 
  LoginGuardGuard, 
  SubirArchivoService, 
  HospitalService, 
  MedicoService} from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { AdminGuard } from './guards/admin.guard';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SharedService, 
    SidebarService, 
    UsuarioService, 
    LoginGuardGuard, 
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
