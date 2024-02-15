import {Vehicule} from "./vehicule";

export interface Fiche_recherche {

  Person_name?: string;
  Person_surname?: string;
  Person_nationality?:string;
  Person_CIN?:string;
  Person_address:string ;
  Zip?:number;
  Status:string;
  Gravity_degree?:string ;
  Vehicules?:Vehicule[];
}
