import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsUrls } from '../endpoints';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getTotalOrders()  {
    return this._http.get(EndpointsUrls.apiEndpoints['totalOrders']);
  }

  getAllOrders(top: number,skip:number) : Observable<any>{
    let params = new HttpParams()
    .set('$top',top.toString())
    .set('$skip',skip.toString());

    return this._http.get(EndpointsUrls.apiEndpoints['allOrders'],{params});
  }

}
