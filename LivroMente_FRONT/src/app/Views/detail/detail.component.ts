import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
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
