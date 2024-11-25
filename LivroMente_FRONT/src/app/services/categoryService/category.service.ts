import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this._http.get<Category[]>(EndpointsUrls.apiEndpoints['allCategories']);
  }

  getCategoryById(id: string) : Observable<Category>{
    return this._http.get<Category>(EndpointsUrls.apiEndpoints['byIdCategory']);
  }
}
