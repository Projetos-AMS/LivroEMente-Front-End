import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderComponent } from '../orders/modals/delete-order/delete-order.component';
import { BookService } from 'src/app/services/bookService/book.service';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements AfterViewInit,OnInit {

  displayedColumns: string[] = ['title', 'company', 'value', 'status','acao'];
  books: any[] = [];
  totalItems: number = 0; 
  pageSize: number = 5; 
  currentPage: number = 0;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator =  <MatPaginator>{};

  constructor(private bookService: BookService){}
  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() =>{
      this.loadOrders();
    })
  }

  loadOrders() : void{
    const skip = this.currentPage * this.pageSize;
    this.bookService.getAllBooks(this.pageSize,skip).subscribe(data => {
      this.books = data;
      this.totalItems = data['@odata.count']; 
    })
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize; // Atualiza o pageSize com o novo valor
    this.currentPage = event.pageIndex; // Atualiza a página atual
    this.loadOrders(); // Recarrega os dados
  }

  delete(orderId:string): void {
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      data: {
        orderId:orderId
      },
      
      
    });
    console.log(orderId);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  getDetails(orderId:string): void {
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      data: {
        orderId:orderId
      },
      
      
    });
    console.log(orderId);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
