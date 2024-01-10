import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Police} from "../api/police";

@Injectable({
  providedIn: 'root'
})
export class PoliceService {
  private apiUrl = 'http://localhost:8080/police'; // Default API endpoint

  constructor(private http: HttpClient) {
  }

  createPolice(police: Police) {
    return this.http.post(this.apiUrl, police);
  }

  getPoliceByID(id: any):Observable<Police> {
    return this.http.get<Police>(this.apiUrl + '/' + id);
  }

  getAllPolice():Observable<Police[]>
{
    return this.http.get<Police[]>(this.apiUrl + '/all');
  }
  deletePolice(id: any) {
    return this.http.delete(this.apiUrl+ '/' + id);
  }
}
