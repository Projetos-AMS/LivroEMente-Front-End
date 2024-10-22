import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { Book } from 'src/app/model/Book';
import { PreferenceService } from 'src/app/services/preferenceService/preference.service';
import { Preference } from "src/app/model/Preference";


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

  product = {
    id: "",
    title: '',
    description: '',
    quantity: 0,
    currencyId: 'BRL',
    unitPrice: 0
  };




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
  constructor(private preferenceService: PreferenceService){}
  comprar() {
    
    // Primeiro, certifique-se de que está buscando a lista de produtos no localStorage
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if (produtoLocalStoge) {
      this.listaBook = JSON.parse(produtoLocalStoge);
    }
  
    // Crie o array de items a partir da lista de livros
    const items = this.listaBook.map(book => ({
      title: book.title,
      description: book.synopsis,
      quantity: book.quantity,
      currency_id: this.product.currencyId,
      unitprice: book.value, // Corrigido para acessar o preço de cada livro
    }));
  
    // Configuração da requisição de pagamento
    const request = {
      items: items,
      back_urls: {
        success: 'https://www.your-site.com/success',
        failure: 'https://www.your-site.com/failure',
        pending: 'https://www.your-site.com/pending'
      },
      auto_return: 'approved' // Opcional
    };
  
    // Chama a API de pagamento
    this.preferenceService.createPayment(request).subscribe(
      response => {
        const redirectUrl = response.preference.sandboxInitPoint;
        console.log('Resposta da API:', redirectUrl); 
        window.location.href = redirectUrl; 
      },
      error => {
        console.error('Erro ao criar pagamento:', error);
      }
    );
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
