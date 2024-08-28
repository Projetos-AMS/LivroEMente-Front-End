import {
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})


export class HomeComponent implements OnInit {
  Books: any;
  categories: any;
  Book!: Book;

  constructor(private router: Router,private _service: BookService) {}

  ngOnInit(): void {
    this._service.getBooks().subscribe((books) => {
      this.Books = books;
    })
  }

  public abrirProduto(Book = this.Book) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(Book));
    this.router.navigate(['/detalhe']);
  }
}
