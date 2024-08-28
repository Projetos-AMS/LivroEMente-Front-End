import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/account/shared/account.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private accountService : AccountService, private router: Router){}
  ngOnInit() {
  }

  async onSubmit(){
    try{
      const result = await this.accountService.createdAccount(this.account);
      this.router.navigate(['login']);
    }catch(error){
      console.error(error);
      this.router.navigate(['login']);
    }
  }
}
