import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getTotalOrders()  {
    return this._http.get(EndpointsUrls.apiEndpoints['totalOrders']);
  }

}
