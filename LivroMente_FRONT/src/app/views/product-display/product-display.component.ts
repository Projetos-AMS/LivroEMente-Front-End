import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { AccountService } from 'src/app/services/accountService/account.service';
import { BookService } from 'src/app/services/bookService/book.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css'
})
export class ProductDisplayComponent implements OnInit {
  @Input({ required: true }) displayName!: string;
  @Input() displayCategory!: string;
  Books: any;
  Book!: Book;

  constructor(
    private router: Router,
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _orderService: OrderService,
    private route: ActivatedRoute,
    private _accountService: AccountService,
  ) { }

  ngOnInit(): void {
    if (!this.displayCategory) {
      this._bookService.getBooks().subscribe((books) => {
        this.Books = books;
      });
    } else {
      this._bookService.getBooksByCategory(`CategoryId eq '${this.displayCategory}'`).subscribe(
        (filteredBooks) => {
          this.Books = filteredBooks;
          console.log(filteredBooks);
        },
        (error) => console.error('Erro ao buscar livros pela categoria:', error)
      );
    }
  }

  public abrirProduto(Book = this.Book) {

    if (!Book || Object.keys(Book).length === 0) {
      console.error('Objeto Book está indefinido ou vazio.');
      return;  // Sai da função se o Book estiver indefinido ou vazio
    }

    sessionStorage.setItem('produtoDetalhe', JSON.stringify(Book));
    console.error('Produto detalhado armazenado:', Book);
    this.router.navigate(['/detalhe']);
  }
}
