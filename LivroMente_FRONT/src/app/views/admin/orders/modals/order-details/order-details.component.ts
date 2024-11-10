import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, Input, model, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { OrderDto } from 'src/app/model/OrderDetails';
import { CommonModule } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatDatepickerModule,
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  
//  order: OrderDto | null = null;
// @Input() order: OrderDto | null = null;
  // order: OrderDto = {} as OrderDto;
  order: OrderDto = {} as OrderDto;
 
  readonly panelOpenState = signal(false);


  constructor(
    private _service: OrderService, 
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string }, // Injeta os dados passados pelo dialog
    private dialogRef: MatDialogRef<OrderDetailsComponent>,
  ){}

  ngOnInit(): void {
    this._service.getbyIdOrder(this.data.orderId).subscribe(
      (data: OrderDto) =>{
        this.order = data || {} as OrderDto;
        this._changeDetectorRef.detectChanges();        
      },
      (error) =>{
        console.log('erro');
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
