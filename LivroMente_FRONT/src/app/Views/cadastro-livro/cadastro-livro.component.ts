import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UploadService } from '../upload.service';
@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-livro.component.html',
  styleUrl: './cadastro-livro.component.css',
  template: `
  <input type="file" (change)="onFileSelected($event)">
  <button (click)="uploadFile()">Upload</button>
  `,
})
export class CadastroLivroComponent {
  selectedFile: File | undefined;

  // constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // uploadFile(): void {
  //   if (this.selectedFile) {
  //     this.uploadService.uploadFile(this.selectedFile).subscribe(
  //       (link: any) => {
  //         console.log('Link do arquivo:', link);
  //         console.log('Link do arquivo:', link);
  //         console.log('Link do arquivo:', link);
  //         console.log('Link do arquivo:', link);
  //         console.log('Link do arquivo:', link);
  //         console.log('Link do arquivo:', link);
  //         // Faça algo com o link retornado, se necessário
  //       },
  //       (error: any) => {
  //         console.error('Erro ao fazer upload:', error);
  //       }
  //     );
  //   } else {
  //     console.warn('Nenhum arquivo selecionado.');
  //   }
  // }


}
