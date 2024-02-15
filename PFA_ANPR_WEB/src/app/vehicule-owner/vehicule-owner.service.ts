import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Police} from "../api/police";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehiculeOwnerService {
  private apiUrl = 'http://localhost:8081/vehicleOwner'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(police: Police) {
    return this.http.post(this.apiUrl+"/create", police);
  }
  getByID(id: any):Observable<Police> {
    return this.http.get<Police>(this.apiUrl + '/' + id);
  }
  getAll():Observable<Police[]>
  {
    return this.http.get<Police[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
