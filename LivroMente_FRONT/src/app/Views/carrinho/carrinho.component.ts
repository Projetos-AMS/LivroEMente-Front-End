import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  Book = {
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

  

}
