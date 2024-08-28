import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/uploadService/upload.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { Category } from 'src/app/model/Category';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';


@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent,ReactiveFormsModule],
  templateUrl: './cadastro-livro.component.html',
  styleUrl: './cadastro-livro.component.css',
  template: `
  <input type="file" (change)="onFileSelected($event)">
  <button (click)="uploadFile()">Upload</button>
  `,

})
export class CadastroLivroComponent implements OnInit {
  book: Book = {} as Book;
  categories !: Category[];
  showError: boolean | undefined;
  showAcerto: boolean | undefined;
  bookForm: FormGroup;

  ngOnInit() {
    this.getCategories();
    
  }
  selectedFile: File | undefined;

  constructor(private uploadService: UploadService, private categoryService: CategoryService, private bookService: BookService, private http: HttpClient, private form: FormBuilder, private router: Router) 
  { 
    this.bookForm = this.form.group({
      title: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      author: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      synopsis: ['',[Validators.pattern(/[\S]/)]],
      quantity: [''],
      pages: ['',[Validators.pattern(/[\S]/)]],
      publishingCompany: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      isbn: [''],
      value: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      language: ['',[Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      classification:['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      isActive: [true],
      categoryId: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      urlBook: ['',[Validators.pattern(/[\S]/)]],
      urlImg: ['',[Validators.pattern(/[\S]/)]]
    });
  }

  async postBook() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Livro cadastrado",
      showConfirmButton: false,
      timer: 2000
    });
    
      await this.uploadFile();
      const bookData = this.bookForm.value;
      this.bookService.postBook(bookData).subscribe();
      this.router.navigate(['/'])
    
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  uploadFile(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.selectedFile) {

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.uploadService.upload(formData).subscribe(
          (response: { path: string }) => {
            this.bookForm.patchValue({ urlImg: response.path });
            resolve();
          },
          (error: any) => {
            console.error('Erro ao fazer upload:', error);
            resolve();
          }
        );
      } else {
        console.warn('Nenhum arquivo selecionado.');
        resolve();
      }
    });
  }
}
