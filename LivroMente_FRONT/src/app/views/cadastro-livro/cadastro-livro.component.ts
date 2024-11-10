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
import { Book, BookDto } from 'src/app/model/Book';


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
  hasError: any;

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

      await this.uploadFile();

      console.log(this.bookForm.value);
      const bookData = {
        BookRequest: {
          title: this.bookForm.get('title')?.value,
          author: this.bookForm.get('author')?.value,
          synopsis: this.bookForm.get('synopsis')?.value,
          quantity: this.bookForm.get('quantity')?.value,
          pages: this.bookForm.get('pages')?.value,
          publishingCompany: this.bookForm.get('publishingCompany')?.value,
          isbn: this.bookForm.get('isbn')?.value,
          value: this.bookForm.get('value')?.value,
          language: this.bookForm.get('language')?.value,
          classification: this.bookForm.get('classification')?.value,
          isActive:this.bookForm.get('isActive')?.value,
          categoryId: this.bookForm.get('categoryId')?.value,
          urlBook: this.bookForm.get('urlBook')?.value,
          urlImg: this.bookForm.get('urlImg')?.value
        }
      } as BookDto;
      this.bookService.postBook(bookData).subscribe({
        next: (data) =>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Livro cadastrado",
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/'])
        },
        error: (errors) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Erro ocorreu",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
       
      
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
