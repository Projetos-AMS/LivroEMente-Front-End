import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsUrls } from '../endpoints';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { OrderDto } from 'src/app/model/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getTotalOrders()  {
    return this._http.get(EndpointsUrls.apiEndpoints['totalOrders']);
  }
  createOrdeer(orderData: any): Observable<any> {
    return this._http.post<any>(EndpointsUrls.apiEndpoints['order'], orderData);
    }

 

  getAllOrders(top: number,skip:number) : Observable<any>{
    let params = new HttpParams()
    .set('$top',top.toString())
    .set('$skip',skip.toString());

    return this._http.get(EndpointsUrls.apiEndpoints['allOrders'],{params});
  }

  getbyIdOrder(id: string):Observable<OrderDto>{
    return this._http.get<OrderDto>(`${EndpointsUrls.apiEndpoints['byIdOrder']}${id}`);
  }

  cancelOrder(id: string){
    return this._http.delete(`${EndpointsUrls.apiEndpoints['cancelOrder']}${id}`);
  }

}
