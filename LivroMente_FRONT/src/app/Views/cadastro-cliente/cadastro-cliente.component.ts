import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/account/shared/account.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent  implements OnInit {
  account = {
    completeName: '',
    userName:'',
    email: '',
    password:'',
    confirmPassword:'',
    role:'Cliente'
  }

  constructor(private accountService : AccountService){}
  ngOnInit() {
  }

  async onSubmit(){
    try{
      const result = await this.accountService.createdAccount(this.account);
      console.log(result);
      console.log("Sucesso");
    }catch(error){
      console.error(error);
    }
  }
}
