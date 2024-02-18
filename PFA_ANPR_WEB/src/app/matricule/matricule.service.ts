import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicule} from "../api/vehicule";
import {LicensePlate} from "../api/licensePlate";

@Injectable({
  providedIn: 'root'
})
export class MatriculeService {
  private apiUrl = 'http://localhost:8081/licensePlate'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(licensePlate: LicensePlate) {
    return this.http.post(this.apiUrl+"/create", licensePlate);
  }
  getByID(id: any):Observable<LicensePlate> {
    return this.http.get<LicensePlate>(this.apiUrl + '/' + id);
  }
  getAll():Observable<LicensePlate[]>
  {
    return this.http.get<LicensePlate[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
