import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-delete-book',
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
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent {

  constructor(
    private _service: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string },
    private dialogRef: MatDialogRef<DeleteBookComponent>,

  ){}

  delete(): void {
    this._service.cancelBook(this.data.bookId).subscribe({
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
