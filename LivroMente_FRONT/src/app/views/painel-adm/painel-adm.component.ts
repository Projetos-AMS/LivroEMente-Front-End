import { Component, OnInit } from '@angular/core';
 import { MatProgressBarModule } from '@angular/material/progress-bar';
 import { MatCardModule } from '@angular/material/card';
 import { MatChipsModule } from '@angular/material/chips';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel-adm',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule,CommonModule,],
  templateUrl: './painel-adm.component.html',
  styleUrl: './painel-adm.component.css'
})
export class PainelAdmComponent implements OnInit {

  totalOrders: any;

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this._orderService.getTotalOrders().subscribe((total) => {
      this.totalOrders = total;
      console.log(this.totalOrders)
    });
  }

}
