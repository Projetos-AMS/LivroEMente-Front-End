import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderComponent } from './modals/delete-order/delete-order.component';
import { OrderDetailsComponent } from './modals/order-details/order-details.component';

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

  constructor(private orderService: OrderService,private _changeDetectorRef: ChangeDetectorRef,){}
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



  delete(orderId:string): void {
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      data: {
        orderId:orderId
      },
      
      
    });
    console.log(orderId);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this._changeDetectorRef.detectChanges();   
     
    });
  }

  getDetails(orderId:string): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: {
        orderId:orderId
      },
      
      
    });
 

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }



}

