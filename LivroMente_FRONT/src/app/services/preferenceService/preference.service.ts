import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  
constructor(private http: HttpClient) { }

createPayment(productData: any): Observable<any> {
  return this.http.post<any>(EndpointsUrls.apiEndpoints['preference'], productData);
  }
}