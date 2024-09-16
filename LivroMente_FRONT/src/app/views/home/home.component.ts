import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CategoryFilterComponent,FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  Books: any;
  Categories: any;
  Book!: Book;
  selectedCategories: string[] = [];
  romanceBooks: Book[] = [];

  faSearch = faSearch;

  constructor(
    private router: Router,
    private _bookService: BookService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this._bookService.getBooks().subscribe((books) => {
      this.Books = books;
    });

    this._categoryService.getCategories().subscribe((categories) => {
      this.Categories = categories;
    });

    const romanceFilter =  `CategoryId eq 77dfc691-482d-406c-9518-9e470fdec4cd`;
    this._bookService.getBooksByCategory(romanceFilter).subscribe((books) => {
      this.romanceBooks = books;
    });
  }

  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
    }
    this.filterBooksByCategory();
  }

  filterBooksByCategory() {
    if (this.selectedCategories.length === 0) {
      this._bookService.getBooks().subscribe((books) => {
        this.Books = books;
      });
    } else {
      const filterQuery = this.selectedCategories
        .map((cat) => `CategoryId eq ${cat}`)
        .join(' or ');
      this._bookService.getBooksByCategory(filterQuery).subscribe((filteredBooks) => {
        this.Books = filteredBooks;
      });
    }
  }

  public abrirProduto(Book = this.Book) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(Book));
    this.router.navigate(['/detalhe']);
  }
}
