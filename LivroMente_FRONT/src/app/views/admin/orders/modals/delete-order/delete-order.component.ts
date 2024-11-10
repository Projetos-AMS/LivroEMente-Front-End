import { Component, Inject, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { OrderService } from 'src/app/services/orderService/order-service.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-delete-order',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.css'
})
export class DeleteOrderComponent {




  constructor(
    private _service: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<DeleteOrderComponent>,

  ){}

  delete(): void {
    this._service.cancelOrder(this.data.orderId).subscribe({
      complete: () =>{
        this.dialogRef.close();
      },
      error: () => {
       console.log('Um erro ocorreu');
    }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
