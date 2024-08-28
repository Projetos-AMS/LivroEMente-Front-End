import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterState as RouterState_2 } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})

export class PagamentoComponent {

  constructor(public router: Router){}

  showError: boolean = false;
  showAcerto: boolean = false;

  validateForm() {
    const cardNumber = (<HTMLInputElement>document.getElementById('card-number')).value;
    const cardHolder = (<HTMLInputElement>document.getElementById('card-holder')).value;
    const expiryDate = (<HTMLInputElement>document.getElementById('expiry-date')).value;
    const cvv = (<HTMLInputElement>document.getElementById('cvv')).value;

    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      this.showError = true;
      this.showAcerto = false;
    } else {
      // Lógica de pagamento aqui
      console.log('Pagamento processado com sucesso!');
      this.showError = false;
      this.showAcerto = true;
      this.showSuccessAlert();

    }
  }

  pay() {
    this.validateForm();
  }
  showSuccessAlert() {
    alert('Pagamento processado com sucesso!\n Retornando para a pagina Inicial');
    this.router.navigate(['']);
  }
}
