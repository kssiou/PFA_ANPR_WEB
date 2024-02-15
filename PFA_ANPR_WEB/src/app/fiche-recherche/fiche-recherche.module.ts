import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, Routes} from "@angular/router";
import {FicheRechercheDetailsComponent} from "./fiche-recherche-details/fiche-recherche-details.component";
import {FicheRechercheCreateComponent} from "./fiche-recherche-create/fiche-recherche-create.component";

const route:Routes=[
  {path:'fiche-recherche',component:FicheRechercheDetailsComponent},
  {path:'fiche-recherche-create',component:FicheRechercheCreateComponent}
];
@NgModule({
  declarations: [
    FicheRechercheDetailsComponent ,
    FicheRechercheCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FicheRechercheModule { }
