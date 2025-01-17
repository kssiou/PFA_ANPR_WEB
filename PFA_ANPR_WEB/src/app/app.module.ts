import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {SplitterModule} from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import {HttpClientModule} from "@angular/common/http";
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

import { MatriculeDetailComponent } from './matricule/matricule-detail/matricule-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {PoliceDetailComponent} from "./police/police-detail/police-detail.component";
import { FicheRechercheDetailsComponent } from './fiche-recherche/fiche-recherche-details/fiche-recherche-details.component';
import { FicheRechercheCreateComponent } from './fiche-recherche/fiche-recherche-create/fiche-recherche-create.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {ColorPickerModule} from "primeng/colorpicker";
import { LoginComponent } from './login/login.component';
import { LoginControllerComponent } from './login/login.controller';
import { AuthenticationService } from './service/auth.service';
import { VehiculeOwnerComponent } from './vehicule-owner/vehicule-owner.component';
import { VehiculeDetailsComponent } from './vehicule/vehicule-details/vehicule-details.component';
import { PoliceStationComponent } from './police-station/police-station.component';

@NgModule({
  declarations: [
    AppComponent,
    MatriculeDetailComponent,
    DashboardComponent,
    PoliceDetailComponent,
    FicheRechercheDetailsComponent,
    FicheRechercheCreateComponent,
    LoginComponent,
    LoginControllerComponent,
    VehiculeOwnerComponent,
    VehiculeDetailsComponent,
    PoliceStationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    ButtonModule,
    SplitterModule,
    DividerModule,
    AccordionModule,
    ToolbarModule,
    PanelModule,
    InputTextModule,
    HttpClientModule,
    CheckboxModule,
    PasswordModule,
    FormsModule,
    ChartModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    ColorPickerModule

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
