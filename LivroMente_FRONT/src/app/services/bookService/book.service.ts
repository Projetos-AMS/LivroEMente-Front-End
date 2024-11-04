import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this._http.get<Book[]>(EndpointsUrls.apiEndpoints['allBooks']);
  }

  getAllBooks(top: number,skip:number) : Observable<any>{
    let params = new HttpParams()
    .set('$top',top.toString())
    .set('$skip',skip.toString());

    return this._http.get(EndpointsUrls.apiEndpoints['allBooks'],{params});
  }

  postBook(book:Book){
    return this._http.post<Book>(EndpointsUrls.apiEndpoints['addBook'],book);
  }

  getBooksByCategory(filter: string): Observable<Book[]> {
    const url = `${EndpointsUrls.apiEndpoints['allBooks']}?$filter=${filter}`;
    return this._http.get<Book[]>(url);
  }
}
