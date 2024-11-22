import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/uploadService/upload.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { Category } from 'src/app/model/Category';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book, BookDto } from 'src/app/model/Book';
import { FooterComponent } from "../components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule,FormsModule, HeaderComponent, ReactiveFormsModule, FooterComponent, MatFormFieldModule,
    MatInputModule,],
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
  isEditMode = false;
  bookId!: string;
  maxSynopsisNameSize: number = 300;
  maxLanguageNameSize: number = 2;
  maxTitleNameSize: number = 50;
  maxIsbnNameSize: number = 20;
  maxPublishingCompanyNameSize:number = 20;
  maxAuthorNameSize: number = 60;
  
  

 

  selectedFile: File | undefined;

  constructor(private uploadService: UploadService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private bookService: BookService, private http: HttpClient, private form: FormBuilder, private router: Router) 
  { 
    this.bookForm = this.form.group({
      title: ['',[ Validators.required,
        Validators.pattern(/[\S]/),
        Validators.maxLength(50)
      ]],
      author: ['',[ Validators.required,
        Validators.pattern(/[\S]/),
        Validators.maxLength(60)
      ]],
      synopsis: ['',[
        Validators.pattern(/[\S]/),
        Validators.maxLength(300)
      ]],
      quantity: [''],
      pages: ['',[Validators.pattern(/[\S]/)]],
      publishingCompany: ['',[ Validators.required,
        Validators.pattern(/[\S]/),
        Validators.maxLength(20)
      ]],
      isbn: ['',[
        Validators.pattern(/[\S]/),
        Validators.maxLength(20)
      ]],
      value: ['',[ Validators.required,
        Validators.pattern(/[\S]/)
      ]],
      language: ['',[Validators.required,
        Validators.pattern(/[\S]/),
        Validators.maxLength(2)
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

  ngOnInit() {
      
     this.getCategories();
   

    this.bookId = this.activatedRoute.snapshot.params['id'];
    console.log(this.bookId);
    
      if (this.bookId) {
        this.isEditMode = !!this.bookId;
        console.log(this.bookId);
        
        this.loadBookData(this.bookId);
      }
    
    
  }

  loadBookData(id: string) {
    this.bookService.getByIdBook(id).subscribe((book) => {
      this.bookForm.patchValue(book);
      console.log(book);
      
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

      if(this.isEditMode)
      {
        console.log("entrei");
        console.log(bookData);
        
        
        this.bookService.updateBook(this.bookId,bookData.BookRequest).subscribe({
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
      }else{
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
