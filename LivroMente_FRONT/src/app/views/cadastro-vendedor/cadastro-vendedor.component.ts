import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/account/shared/account.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-vendedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-vendedor.component.html',
  styleUrl: './cadastro-vendedor.component.css'
})
export class CadastroVendedorComponent implements OnInit{
  account = {
    completeName: '',
    userName:'',
    email: '',
    password:'',
    confirmPassword:'',
    role:'Vendedor'
  }

  constructor(private accountService : AccountService,  private router: Router){}
  ngOnInit() {
  }

  async onSubmit(){
    try{
      const result = await this.accountService.createdAccount(this.account);
      console.log(result);
      console.log("Sucesso");
      this.router.navigate(['login']);
    }catch(error){
      console.error(error);
    }
  }
}
