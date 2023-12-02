import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/account/shared/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  login = {
    email : '',
    password : ''
  }
  constructor(private accountService: AccountService,private router:Router){

  }

  ngOnInit() {
    this.login.email = '';
  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);

      //navego para a rota vazia
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

}
