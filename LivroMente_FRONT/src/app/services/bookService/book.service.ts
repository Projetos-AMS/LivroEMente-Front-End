import { HttpClient } from '@angular/common/http';
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

  postBook(book:Book){
    return this._http.post<Book>(EndpointsUrls.apiEndpoints['addBook'],book);
  }

  getBooksByCategory(filter: string): Observable<Book[]> {
    const url = `${EndpointsUrls.apiEndpoints['allBooks']}?$filter=${filter}`;
    return this._http.get<Book[]>(url);
  }
}
