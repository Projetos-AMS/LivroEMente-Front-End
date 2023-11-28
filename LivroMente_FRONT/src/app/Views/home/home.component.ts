import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products = [
    {
      name: 'Livro Rosa',
      price: '10'
    },
    {
      name: 'teste2'
    },
    {
      name: 'teste3'
    },
    {
      name: 'teste4'
    },
    {
      name: 'teste5'
    },
    {
      name: 'teste6'
    },
    {
      name: 'teste7'
    },
    {
      name: 'teste8'
    },
    {
      name: 'teste9'
    }
    ]

}
