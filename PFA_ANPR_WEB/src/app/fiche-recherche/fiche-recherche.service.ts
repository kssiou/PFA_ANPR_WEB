import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FicheDeRecherche} from "../api/ficheDeRecherche";
import {Fiche_recherche} from "../api/fiche_recherche";
import {VehiculeApi} from "../api/vehiculeApi";

@Injectable({
  providedIn: 'root'
})
export class FicheRechercheService {
  private apiUrl = 'http://localhost:8081/ficheDeRecherche'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(ficheDeRecherche: VehiculeApi) {
    return this.http.post(this.apiUrl+"/create", ficheDeRecherche);
  }
  getByID(id: any):Observable<FicheDeRecherche> {
    return this.http.get<FicheDeRecherche>(this.apiUrl + '/' + id);
  }
  getAll():Observable<VehiculeApi[]>
  {
    return this.http.get<VehiculeApi[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
