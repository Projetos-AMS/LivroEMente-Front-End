import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { Order } from 'src/app/model/Order';
import { AddOrderComponent } from './modals/add-order/add-order.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderComponent } from './modals/delete-order/delete-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['userId', 'date', 'valueTotal', 'status','acao'];
  orders: any[] = [];
  totalItems: number = 0; 
  pageSize: number = 5; 
  currentPage: number = 0;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator =  <MatPaginator>{};

  constructor(private orderService: OrderService){}
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
    this.orderService.getAllOrders(this.pageSize,skip).subscribe(data => {
      this.orders = data;
      this.totalItems = data['@odata.count']; 
    })
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize; // Atualiza o pageSize com o novo valor
    this.currentPage = event.pageIndex; // Atualiza a página atual
    this.loadOrders(); // Recarrega os dados
  }

  openDialog(orderId:string): void {
    const dialogRef = this.dialog.open(AddOrderComponent, {
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



}

