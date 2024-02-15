import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FicheDeRecherche} from "../api/ficheDeRecherche";

@Injectable({
  providedIn: 'root'
})
export class FicheRechercheService {
  private apiUrl = 'http://localhost:8081/ficheDeRecherche'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(ficheDeRecherche: FicheDeRecherche) {
    return this.http.post(this.apiUrl+"/create", ficheDeRecherche);
  }
  getByID(id: any):Observable<FicheDeRecherche> {
    return this.http.get<FicheDeRecherche>(this.apiUrl + '/' + id);
  }
  getAll():Observable<FicheDeRecherche[]>
  {
    return this.http.get<FicheDeRecherche[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
