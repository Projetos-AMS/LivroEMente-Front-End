import { Menu } from 'src/app/model/Menu';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { faCircleUser, faLocationDot, faUser, faClock, faWallet } from './../../../../node_modules/@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderService } from 'src/app/services/orderService/order-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FontAwesomeModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent{
  Orders: any;

  faCircleUser = faCircleUser;
  faClock = faClock;
  faUser = faUser;
  faLocationDot = faLocationDot;
  faWallet = faWallet;

  public currentMenu: Menu = Menu.Menu2

  constructor(
    private _orderService: OrderService
  ){}

  setCurrentMenu(menu : Menu){
    this.currentMenu = menu
  }

  selectMenuMyProfile(){
    this.setCurrentMenu(0);
  }

  selectMenuOrderHistory(){
    this._orderService.getAllOrders(1,0).subscribe((orders) =>{
      this.Orders = orders;
      console.log(this.Orders);
    });

    this.setCurrentMenu(1);
  }
}