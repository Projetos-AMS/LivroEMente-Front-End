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
  comprar(Book:Book = this.Book): void{
    if (!Book) {
      console.error('O livro é indefinido ou nulo, não é possível adicionar ao carrinho');
      return;
    }
    let ListaBook: Book[] = JSON.parse(sessionStorage.getItem('ListaBook') || '[]');

    // Adiciona o novo livro à lista existente
    ListaBook.push(Book);

    // Salva a lista atualizada no sessionStorage
    sessionStorage.setItem('ListaBook', JSON.stringify(ListaBook));
    console.log('Carrinho atualizado:', ListaBook);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Livro Adicionado",
      showConfirmButton: false,
      timer: 2000
    });
    this.router.navigate(['carrinho']);
  }







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
    
    this.livroDisponivel();
  }


  

  livroDisponivel() {
    const isFree = this.Book.value <= 0;

    this.botaoGratis = isFree;
    this.botaoComprar = !isFree;
    this.botaoCarrinho = !isFree;
  }



}
