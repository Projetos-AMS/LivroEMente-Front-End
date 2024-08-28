import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { Book } from 'src/app/model/Book';


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
  totalGeral: any;
  listaBook: Book[] = [];
  total:any = 1;
  adicionar(book: Book){
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if (!produtoLocalStoge) {
        // se nao existir 
          this.listaBook.push(book);   
        
    } else {
        // se ja existir 
         this.listaBook = JSON.parse(produtoLocalStoge);
         this.listaBook.push(book); 
                    
    }
     localStorage.setItem("produtoLocalStoge", JSON.stringify(this.listaBook));
  }

  ObterProduto() : Book[]   {
    
    var total: any=0;
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if(produtoLocalStoge){
      this.listaBook = JSON.parse(produtoLocalStoge);
      // this.listaBook.forEach(function(a){
      //   total += a.value * a.quantity;
      // })

      //this.totalGeral=total;
      this.AtualizarTotal();
    }
      
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
 

  aumentarQuantidade() {
   
      // this.listaBook.forEach(function(a){
      //   total += a.value;
      // })
      // this.total++;
  
  }

  AtualizarTotal(): void {
   var total:any = 0;
    
    if (this.listaBook) {
      this.listaBook.forEach(function (a) {
        total += a.value;
      }, this); // O segundo parâmetro define o contexto da função de retorno de chamada
    }
    this.totalGeral = total;
  }

  diminuirQuantidade() {
    if (this.total > 1) {
      this.total--;
    }
  }
}
