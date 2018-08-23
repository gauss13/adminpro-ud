import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ProgressComponent } from './pages/progress/progress.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
// import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SettingsService } from './services/service.index';
// import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';

import {ServiceModule} from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // NopagefoundComponent,
    // DashboardComponent,
    // ProgressComponent,
    // Graficas1Component,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumbsComponent,
    // PagesComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule, APP_ROUTES, PagesModule, FormsModule, ServiceModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
