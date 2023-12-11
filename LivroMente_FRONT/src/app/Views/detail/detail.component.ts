import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient, private router: Router) {}


  Book = {
    id: '',
    title: '',
    author: '',
    synopsis: '',
    quantity: 0,
    pages: 0,
    publishingCompany: '',
    isbn: '',
    value: 0.0,
    language: '',
    classification: 0,
    isActive: true,
    categoryId: '',
    urlBook: '',
    urlImg: '',
  };

  ngOnInit(): void {

    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
    if (produtoDetalhe) {
      this.Book = JSON.parse(produtoDetalhe);
    }
    this.http.get('http://localhost:5170/api/Book').subscribe((Books) => {
      (this.Books = Books), console.log(Books);
    });
    this.carrinhoCompra = new CarrinhoComponent();
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


  livroGratis(){
    if(this.Book.urlBook != ''){
      this.botaoGratis = true;
      this.botaoComprar= false;
      this.botaoCarrinho=false;
    }
    else{
      this.botaoGratis = false;
      this.botaoComprar= true;
      this.botaoCarrinho=true;
    }

  }


}
