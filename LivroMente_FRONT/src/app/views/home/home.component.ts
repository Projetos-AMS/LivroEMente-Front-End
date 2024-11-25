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
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { OrderDto, OrderRequest } from 'src/app/model/OrderDetails';
import { AccountService } from 'src/app/services/accountService/account.service';
import { User } from 'src/app/model/User';
import { ProductDisplayComponent } from '../product-display/product-display.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CategoryFilterComponent, FontAwesomeModule, ProductDisplayComponent],
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
  listaBook: Book[] = [];
  faSearch = faSearch;
  user: User | null = null;
  tituloBusca: string = ''; 
  produtoEncontrado: any | null = null; 
  mensagemErro: string = ''; 


  constructor(
    private router: Router,
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _orderService: OrderService,
    private route: ActivatedRoute,
    private _accountService: AccountService,

  ) { }

  ngOnInit(): void {
    this._accountService.user$.subscribe((userData) => { this.user = userData; console.log('User data:', this.user); });
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
    const romanceCategoryId = '41b88b3a-99b2-4d61-9f76-72dc1b70c1c0';
    const romanceFilter = `CategoryId eq '${romanceCategoryId}'`;
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
        .map((cat) => `CategoryId eq '${cat}'`)
        .join(' or ');


      console.error('Filter Query:', filterQuery);
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
    });
  }

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
      if(status==undefined){}
      else{this.ProcessarPedido(status);}
      

      // Aqui você pode fazer a lógica para verificar se a transação foi bem-sucedida
      if (collectionStatus === 'approved') {
        this.limparCarrinho();
      }
    });
  }








  ProcessarPedido(status: string) {

    // Primeiro, certifique-se de que está buscando a lista de produtos no localStorage
    var produtoLocalStoge = sessionStorage.getItem("ListaBook");
    if (produtoLocalStoge) {
      this.listaBook = JSON.parse(produtoLocalStoge);
    }



    var produtoLocalStoge1 = sessionStorage.getItem("produtoDetalhe");
    if (produtoLocalStoge) {
      this.listaBook = JSON.parse(produtoLocalStoge);
    }

    // Crie o array de items a partir da lista de livros
    console.log('Produto detalhado:', this.listaBook);
    const orderData = {
      orderRequest: {
        userId: this.user?.id, // Substitua pelo ID do usuário correto
        date: new Date().toISOString(),
        valueTotal: this.listaBook.reduce((acc, book) => acc + book.value, 0), // Calcula o valor total
        status: status, // O status da transação (ex.: "approved")
        orderDetails: this.listaBook.map(book => ({
          bookId: book.id, // ID do livro
          amount: 1, // Quantidade do livro
          valueUni: book.value,
          // Valor unitário do livro
        }))
      }
    } as OrderRequest;
    console.log(orderData)

    // Enviar para a API
    this._orderService.createOrdeer(orderData).subscribe(
      response => {
        console.log('Pedido processado com sucesso', response);
      },
      error => {
        console.error('Erro ao processar o pedido', error);
      }
    );
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

