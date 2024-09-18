import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/services/bookService/book.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  Books: any;
  Categories: any;
  Book!: Book;
  selectedCategories: string[] = [];

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
