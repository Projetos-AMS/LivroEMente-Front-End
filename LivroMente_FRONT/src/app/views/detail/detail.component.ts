import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';
import { PreferenceService } from 'src/app/services/preferenceService/preference.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  Books : any;
  botaoGratis!:boolean;
  botaoComprar !: boolean;
  botaoCarrinho!:boolean;
  public carrinhoCompra!: CarrinhoComponent;
  book!: Book;
  category!: string;
  categoryName!: string;

  constructor(
    private _service: BookService, 
    private router: Router, 
    private preferenceService: PreferenceService, 
    private _categoryService: CategoryService
  ) {}

  comprar(Book:Book = this.book): void{
    if (!Book) {
      console.error('O livro é indefinido ou nulo, não é possível adicionar ao carrinho');
      return;
    }
    let ListaBook: Book[] = JSON.parse(sessionStorage.getItem('ListaBook') || '[]');

    ListaBook.push(Book);

    sessionStorage.setItem('ListaBook', JSON.stringify(ListaBook));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Livro Adicionado",
      showConfirmButton: false,
      timer: 2000
    });
    this.router.navigate(['carrinho']);
  }
  
  add(Book:Book = this.book): void{
    if (!Book) {
      console.error('O livro é indefinido ou nulo, não é possível adicionar ao carrinho');
      return;
    }
    let ListaBook: Book[] = JSON.parse(sessionStorage.getItem('ListaBook') || '[]');

    ListaBook.push(Book);

    sessionStorage.setItem('ListaBook', JSON.stringify(ListaBook));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Livro Adicionado",
      showConfirmButton: false,
      timer: 2000
    });
  }

  ngOnInit(): void {

    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    
    if (produtoDetalhe) {
      try {
        this.book = JSON.parse(produtoDetalhe);
        console.log('Produto detalhado:', this.book);
      } catch (error) {
        console.error('Erro ao fazer parse do produto detalhado:', error);
      }
    } else {
    console.warn('Nenhum detalhe do produto encontrado no sessionStorage.');
    }
    this.category = this.book.categoryId;
    this._service.getBooksByCategory(`CategoryId eq '${this.category}'`).subscribe(
      (filteredBooks) => {
        this.Books = filteredBooks;
        console.log(filteredBooks);
      },
      (error) => console.error('Erro ao buscar livros pela categoria:', error)
    );
    this._service.getBooksByCategory( `CategoryId eq '${this.category}'`).subscribe((filteredBooks) => {
      this.Books = filteredBooks;
    });

    this._categoryService.getCategoryById(this.book.categoryId).subscribe((cat) => {
      this.categoryName = cat.description;
    })
    
    this.livroDisponivel();
  }

  livroDisponivel() {
    const isFree = this.book.value <= 0;

    this.botaoGratis = isFree;
    this.botaoComprar = !isFree;
    this.botaoCarrinho = !isFree;
  }

}