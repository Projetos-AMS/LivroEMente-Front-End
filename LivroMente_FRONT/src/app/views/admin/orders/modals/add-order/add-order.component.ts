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

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-order',
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
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})


export class AddOrderComponent {
  readonly animal = model(this.data.animal);
  orderId: string | null;

 

  constructor(
    public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
    this.orderId = data.orderId; // Recebe o orderId passado
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
