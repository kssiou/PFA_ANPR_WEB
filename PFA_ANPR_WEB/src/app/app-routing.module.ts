import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginControllerComponent } from './login/login.controller';
import {MatriculeDetailComponent} from "./matricule/matricule-detail/matricule-detail.component";
import {PoliceDetailComponent} from "./police/police-detail/police-detail.component";
import {
  FicheRechercheDetailsComponent
} from "./fiche-recherche/fiche-recherche-details/fiche-recherche-details.component";
import {FicheRechercheCreateComponent} from "./fiche-recherche/fiche-recherche-create/fiche-recherche-create.component";
import {VehiculeOwnerComponent} from "./vehicule-owner/vehicule-owner.component";
import {VehiculeDetailsComponent} from "./vehicule/vehicule-details/vehicule-details.component";
import {PoliceStationComponent} from "./police-station/police-station.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {path:'matricule',component:MatriculeDetailComponent},
      {path:'dashboard',component:DashboardComponent},
      {path:'police',component:PoliceDetailComponent},
      {path:'fiche-recherche',component:FicheRechercheDetailsComponent},
      {path:'fiche-recherche-create',component:FicheRechercheCreateComponent},
      {path:'vehicule',component:VehiculeDetailsComponent},
      {path:'citoyens',component:VehiculeOwnerComponent},
      {path:'station-police',component:PoliceStationComponent}


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
