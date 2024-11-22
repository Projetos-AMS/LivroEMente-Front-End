import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookDto } from 'src/app/model/Book';
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

  getByIdBook(id:string){
    return this._http.get<Book>(`${EndpointsUrls.apiEndpoints['byBook']}${id}`);
  }

  postBook(book:BookDto){
    return this._http.post<boolean>(EndpointsUrls.apiEndpoints['addBook'],book);
  }

  updateBook(id:string,book:any){
    return this._http.put<boolean>(`${EndpointsUrls.apiEndpoints['updateBook']}${id}`,book);
  }

  getBooksByCategory(filter: string): Observable<Book[]> {
    const url = `${EndpointsUrls.apiEndpoints['allBooks']}?$filter=${filter}`;
    return this._http.get<Book[]>(url);
  }

  cancelBook(id: string){
    return this._http.delete(`${EndpointsUrls.apiEndpoints['cancelBook']}${id}`);
  }
}
