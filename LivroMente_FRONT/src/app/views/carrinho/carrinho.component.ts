import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { Book } from 'src/app/model/Book';
import { PreferenceService } from 'src/app/services/preferenceService/preference.service';
import { Preference } from "src/app/model/Preference";
import { FooterComponent } from '../components/footer/footer.component';


@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent   implements OnInit{
  listaBook: Book[] = [];
  constructor(private preferenceService: PreferenceService){}
  ngOnInit(): void {
   this.ObterProduto();
   this.AtualizarTotal();
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
  
  total:any = 1;
 
  ObterProduto() : void{
    
    const ListaBook = sessionStorage.getItem("ListaBook");
    if (ListaBook) {
      this.listaBook = JSON.parse(ListaBook);
      console.log('Produtos obtidos do carrinho:', this.listaBook);
    } else {
      console.warn('Nenhum produto encontrado no carrinho.');
    }
  }

  remover(book: Book){
   
    var produtoLocalStoge = localStorage.getItem("produtoLocalStoge");
    if(produtoLocalStoge){
       this.listaBook = JSON.parse(produtoLocalStoge);
       this.listaBook = this.listaBook.filter(p => p.id != book.id);
       localStorage.setItem("produtoLocalStoge", JSON.stringify(this.listaBook));
    }
  }
 
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
        success: 'http://localhost:4200/success',
        failure: 'http://localhost:4200/failure',
        pending: 'http://localhost:4200/pending'
      },
      auto_return: 'approved' // Opcional
    };
  
    // Chama a API de pagamento
    this.preferenceService.createPayment(request).subscribe(
      response => {
        const redirectUrlteste = response.preference;
        const redirectUrl = response.preference.initPoint;
        console.log('Resposta da API:', redirectUrlteste); 
       
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
    this.totalGeral = this.listaBook.reduce((total, livro) => {
      return total + (livro.value * (1)); // Multiplica o valor pelo quantidade
    }, 0);

    console.error('Total Geral:', this.totalGeral); // Para verificação
  }

  limparCarrinho() {
    localStorage.removeItem("produtoLocalStoge");
    sessionStorage.removeItem("ListaBook");
    this.listaBook = []; // Limpa a lista em memória
    console.log('Carrinho limpo!');
  }
  

  diminuirQuantidade() {
    if (this.total > 1) {
      this.total--;
    }
  }
}
