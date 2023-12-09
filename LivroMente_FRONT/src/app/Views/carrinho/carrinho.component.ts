import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { Book } from 'src/app/Model/Book';


@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent   implements OnInit{
  ngOnInit(): void {
    this.ObterProduto();
  }

  listaBook: Book[] = [];

  adicionar(book: Book){
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if (!produtoLocalStoge) {
        // se nao existir 
          this.listaBook.push(book);  
          console.log(book)    
          console.log(this.listaBook) ;  
    } else {
        // se ja existir 
         this.listaBook = JSON.parse(produtoLocalStoge);
         this.listaBook.push(book);
         console.log(book)    
        console.log(this.listaBook) ;  
                    
    }
     localStorage.setItem("produtoLocalStoge", JSON.stringify(this.listaBook));
  }

  ObterProduto() : Book[]   {
    // this.totalGeral=0;
    var total: any=0;
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if(produtoLocalStoge){
      this.listaBook = JSON.parse(produtoLocalStoge);
      // this.listaBook.forEach(
      //   // function(a){
      //   // total +=a.price;}
      //   )
    }
         
      //  this.totalGeral=total

      return this.listaBook;
  }

  remover(book: Book){
   
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if(produtoLocalStoge){
       this.listaBook = JSON.parse(produtoLocalStoge);
       this.listaBook = this.listaBook.filter(p => p.id != book.id);
       localStorage.setItem("produtoLocalStoge", JSON.stringify(this.listaBook));
    }
  }

  comprar(){
    localStorage.setItem("produtoLocalStoge", "");
  }
}
