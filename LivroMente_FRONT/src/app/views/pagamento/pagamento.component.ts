import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterState as RouterState_2 } from '@angular/router';
import { PreferenceService } from 'src/app/services/preferenceService/preference.service';
import { Preference } from "src/app/model/Preference";


@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})

export class PagamentoComponent {
  
  product = {
    id: '4',
    title: 'Nome do Produto',
    description: 'Descrição do Produto',
    quantity: 1,
    currencyId: 'BRL',
    unitPrice: 75
  };

  initPoint!: Preference;

  criarPagamento() {
    const request = {
      items: [
        {
          title: this.product.title,
          description: this.product.description,
          quantity: this.product.quantity,
          currency_id: this.product.currencyId,
          unitPrice: this.product.unitPrice,
        }
      ],
      back_urls: {
        success: 'https://www.your-site.com/success',
        failure: 'https://www.your-site.com/failure',
        pending: 'https://www.your-site.com/pending'
      },
      auto_return: 'approved' // Opcional
    };




    this.preferenceService.createPayment(request).subscribe(
      response => {
        const redirectUrl = response.preference.sandboxInitPoint;
        console.log('Resposta da API:', redirectUrl); 
        console.log('resposta da API 2:', response)
        window.location.href = redirectUrl;
        
      },
      error => {
        console.error('Erro ao criar pagamento:', error);
        console.error('Detalhes do erro:', error.error);
      }
    );
  }












  constructor(private preferenceService: PreferenceService){}

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
  }
}
