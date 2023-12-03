import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'http://localhost:5170/Api/Controller/Upload'; // Substitua pela URL real da sua API

  constructor(public http: HttpClient) {}

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('arquivo', file, file.name);

    // return this.http.post<string>(this.apiUrl, formData);
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
    // Configuração do responseType para 'text' para lidar com a resposta como uma string
  }
}