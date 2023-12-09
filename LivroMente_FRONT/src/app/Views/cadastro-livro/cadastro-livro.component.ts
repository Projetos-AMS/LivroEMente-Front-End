import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from 'src/app/upload.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import Swal from 'sweetalert2'
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './cadastro-livro.component.html',
  styleUrl: './cadastro-livro.component.css',
  template: `
  <input type="file" (change)="onFileSelected($event)">
  <button (click)="uploadFile()">Upload</button>
  `,

})
export class CadastroLivroComponent  implements OnInit{


   book =
   {
      Title: '',
      Author:'',
      Synopsis: '',
      Quantity: 0,
      Pages: 0,
      PublishingCompany:'',
      Isbn: '',
      Value:0.0,
      Language:'',
      Classification:0,
      IsActive: true,
      CategoryId: '',
      UrlBook: '',
      UrlImg: ''
    };

   categories : any;
  router: any;
  showError: boolean | undefined;
  showAcerto: boolean | undefined;

  ngOnInit() {
    this.getCategories();
  }
  selectedFile: File | undefined;

  constructor(private uploadService: UploadService, private http : HttpClient) {}

  async postBook(){
    try
    {
      await this.uploadFile();

      const result = this.http.post<any>('http://localhost:5170/api/Book',this.book).subscribe();
      console.log(result);
      console.log("Sucesso");
    }
    catch(error){
      if (error instanceof HttpErrorResponse) {
        // Tratamento de erros HTTP
        if (error.status === 400) {
          // Erro de validação
          console.error('Erro de validação:', error.error);

          // Exiba mensagens de erro ao usuário
          if (error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                const errorMessage = validationErrors[key];
                console.error(`${key}: ${errorMessage}`);
                // Exiba a mensagem de erro ao usuário ou realize outras ações necessárias
              }
            }
          }
        } else {
          // Outros erros HTTP
          console.error(`Erro HTTP ${error.status}: ${error.statusText}`);
          // Exiba uma mensagem de erro genérica ao usuário ou realize outras ações necessárias
        }
      } else {
        // Erros não relacionados à HTTP
        console.error('Erro inesperado:', error);
        // Exiba uma mensagem de erro genérica ao usuário ou realize outras ações necessárias
      }
    }
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getCategories(){
    this.http.get<any[]>('http://localhost:5170/api/CategoryBook')
    .subscribe(categories => { this.categories = categories; });
  }

  uploadFile(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        (link: any) =>
        {
           this.book.UrlImg = link;
           console.log('Link do arquivo:', link);
           resolve();
        },
        (error: any) =>
        {
           console.error('Erro ao fazer upload:', error);
           resolve();
        }
      );
    } else
      {
         console.warn('Nenhum arquivo selecionado.');
         resolve();
      }
      });
    }
}
