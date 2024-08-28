import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  EndpointsUrls } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _http: HttpClient) {}

  upload(formData : FormData){
    return this._http.post<{path: string}>(EndpointsUrls.apiEndpoints['uploadImage'],formData);
  }

}