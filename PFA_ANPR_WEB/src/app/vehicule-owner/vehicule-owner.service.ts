import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle_owner} from "../api/vehicle_owner";

@Injectable({
  providedIn: 'root'
})
export class VehiculeOwnerService {
  private apiUrl = 'http://localhost:8081/vehicleOwner'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(vehiculeOwner: Vehicle_owner) {
    return this.http.post(this.apiUrl+"/add", vehiculeOwner);
  }
  getByID(id: any):Observable<Vehicle_owner> {
    return this.http.get<Vehicle_owner>(this.apiUrl + '/' + id);
  }
  getAll():Observable<Vehicle_owner[]>
  {
    return this.http.get<Vehicle_owner[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
