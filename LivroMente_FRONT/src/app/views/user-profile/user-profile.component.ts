import { Menu } from 'src/app/model/Menu';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { faCircleUser, faLocationDot, faUser, faClock, faWallet } from './../../../../node_modules/@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/services/accountService/account.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FontAwesomeModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent{
  Orders: any;
  user: User | null = null;

  faCircleUser = faCircleUser;
  faClock = faClock;
  faUser = faUser;
  faLocationDot = faLocationDot;
  faWallet = faWallet;

  public currentMenu: number = 0;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.accountService.user$.subscribe((userData) => {
      this.user = userData;
      console.log('User data:', this.user);
    });
  }

  setCurrentMenu(menu : Menu){
    this.currentMenu = menu
  }

  selectMenuMyProfile(){
    this.setCurrentMenu(0);
  }

  selectMenuOrderHistory(){
    this.orderService.getUserOrderById(this.user!.id).subscribe((orders) =>{
      this.Orders = orders;
      console.log(this.Orders);
    });

    this.setCurrentMenu(1);
  };
}
