import { Component, Directive, ElementRef, NgModule, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

// @Directive({
//   selector: '[appNext],[appPrev]'
// })

export class HomeComponent implements OnInit{

  Books : any

  constructor(private http:HttpClient, private router:Router){
    
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5170/api/Book').subscribe(Books => {this.Books = Books, console.log(Books)});
  }

  Book = {
    Title: '',
    Author:'',
    Synopsis: '',
    Quantity: 0,
    Pages: 0,
    PublishingCompany:'Vendedor',
    Isbn: '',
    Value:0.0,
    Language:'',
    Classification:0,
    IsActive: true,
    CategoryId: '',
    UrlBook: '',
    UrlImg: ''
  }

  public abrirProduto() {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(this.Book));
    this.router.navigate(['/detalhe']);
  }
}
