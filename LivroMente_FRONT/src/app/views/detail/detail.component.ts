import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../components/header/header.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';
import { PreferenceService } from 'src/app/services/preferenceService/preference.service';

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

  constructor(private _service: BookService, private router: Router, private preferenceService: PreferenceService) {}

  ngOnInit(): void {

    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    console.log('Valor bruto do produtoDetalhe no sessionStorage:', produtoDetalhe);
    
    if (produtoDetalhe) {
      try {
        this.Book = JSON.parse(produtoDetalhe);
        console.log('Produto detalhado:', this.Book);
    } catch (error) {
        console.error('Erro ao fazer parse do produto detalhado:', error);
    }
} else {
    console.warn('Nenhum detalhe do produto encontrado no sessionStorage.');
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
