import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
   baseUrl = "http://localhost:5000/api/";
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(`${this.baseUrl}Users`);
  }
}
