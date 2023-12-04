import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

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

  ngOnInit(): void {
    var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.Book = JSON.parse(produtoDetalhe);
        }
  }
}
