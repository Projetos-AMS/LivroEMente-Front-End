import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/accountService/account.service';
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
    email: '',
    password:'',
    confirmPassword:'',
    role:'User'
  }

  constructor(private accountService : AccountService, private router: Router){}
  ngOnInit() { }

  async onSubmit(){
    try{
      const result = await this.accountService.createdAccount(this.account);
      this.router.navigate(['']);
    }catch(error){
      console.error(error);
    }
  }
}
