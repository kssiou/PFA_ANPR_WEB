import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {MatriculeDetailComponent} from "./matricule/matricule-detail/matricule-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PoliceDetailComponent} from "./police/police-detail/police-detail.component";
import {
  FicheRechercheDetailsComponent
} from "./fiche-recherche/fiche-recherche-details/fiche-recherche-details.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {path:'matricule',component:MatriculeDetailComponent},
      {path:'dashboard',component:DashboardComponent},
      {path:'police',component:PoliceDetailComponent},
      {path:'fiche-recherche',component:FicheRechercheDetailsComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
