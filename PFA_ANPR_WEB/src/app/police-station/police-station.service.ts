import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Station} from "../api/station";

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
  private apiUrl = 'http://localhost:8081/policeStation'; // Default API endpoint
  constructor(private http: HttpClient) {
  }
  create(station:   Station) {
    return this.http.post(this.apiUrl+"/create", station);
  }
  getByID(id: any):Observable<Station> {
    return this.http.get<Station>(this.apiUrl + '/' + id);
  }
  getAll():Observable<Station[]>
  {
    return this.http.get<Station[]>(this.apiUrl + '/all');
  }
  delete(id: any) {
    return this.http.delete(this.apiUrl+ '/delete/' + id);
  }
}
