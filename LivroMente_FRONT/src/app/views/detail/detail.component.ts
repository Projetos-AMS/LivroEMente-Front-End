import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../components/header/header.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';

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
  Book!: Book;

  constructor(private _service: BookService, private router: Router) {}

  ngOnInit(): void {

    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    if (produtoDetalhe) {
      this.Book = JSON.parse(produtoDetalhe);
    }
    this._service.getBooks().subscribe((books) => {
      this.Books = books;
    });
   
    this.carrinhoCompra = new CarrinhoComponent();
    this.livroDisponivel();
  }


  comprar(book = this.Book){
    this.carrinhoCompra.adicionar(book);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Livro Adicionado",
      showConfirmButton: false,
      timer: 2000
    });
    this.router.navigate(['carrinho']);
  }


  livroDisponivel() {
    const isFree = this.Book.value <= 0;

    this.botaoGratis = isFree;
    this.botaoComprar = !isFree;
    this.botaoCarrinho = !isFree;
  }



}
