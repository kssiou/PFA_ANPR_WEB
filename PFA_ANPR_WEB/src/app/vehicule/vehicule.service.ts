import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicule} from "../api/vehicule";

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:8081/vehicle'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(Vehicule: Vehicule) {
    return this.http.post(this.apiUrl+"/create", Vehicule);
  }
  getByID(id: any):Observable<Vehicule> {
    return this.http.get<Vehicule>(this.apiUrl + '/' + id);
  }
  getAll():Observable<Vehicule[]>
  {
    return this.http.get<Vehicule[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
