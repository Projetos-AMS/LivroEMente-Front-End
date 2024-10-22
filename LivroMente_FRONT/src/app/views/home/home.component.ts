import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BookService } from 'src/app/services/bookService/book.service';
import { Book } from 'src/app/model/Book';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import Swal from 'sweetalert2';

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
  message: string | null = null;

  faSearch = faSearch;

  constructor(
    private router: Router,
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.url.subscribe(url => {
      const path = url.join('/');
      console.log('Caminho atual:', path);
      if (path === 'success') {
        this.showAlert('Sucesso', 'Compra realizada com sucesso!', 'success');
      } else if (path === 'failure') {
        this.showAlert('Erro', 'Houve um erro na compra.', 'error');
      } else if (path === 'pending') {
        this.showAlert('Pendente', 'A compra está pendente.', 'warning');
      }
    });

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

    this.verificarTransacao()
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


  private showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });}

    verificarTransacao() {
      // Obtenha os parâmetros da URL
      this.route.queryParams.subscribe(params => {
        const collectionId = params['collection_id'];
        const collectionStatus = params['collection_status'];
        const paymentId = params['payment_id'];
        const status = params['status'];
        // Você pode acessar outros parâmetros da mesma forma
  
        console.log('Collection ID:', collectionId);
        console.log('Collection Status:', collectionStatus);
        console.log('Payment ID:', paymentId);
        console.log('Status:', status);
  
        // Aqui você pode fazer a lógica para verificar se a transação foi bem-sucedida
        if (collectionStatus === 'approved') {
          this.limparCarrinho();
        }
      });
    }

    limparCarrinho() {
      localStorage.removeItem("produtoLocalStoge");
      sessionStorage.removeItem("ListaBook");
      console.log('Carrinho limpo após compra bem-sucedida!');
      // Redirecione para a página inicial ou onde desejar
      // this.router.navigate(['/home']);
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

