import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBasketShopping, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/accountService/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faUserCircle = faUserCircle;
  faBasketShopping =  faBasketShopping;
  user: User | null = null;

  constructor (private _accountService: AccountService){}
  ngOnInit(){
    this._accountService.user$.subscribe((userData) => {
      this.user = userData; 
    });
  }
  logout() {
    const confirmed = window.confirm('Tem certeza que deseja sair?');
    if (confirmed)
       this._accountService.logout(); 
    
  }

  getProfileRoute(): string {
    if (this.user?.role?.includes('admin')) {
      return '/painel'; 
    }
    return '/profile';
  }
}
