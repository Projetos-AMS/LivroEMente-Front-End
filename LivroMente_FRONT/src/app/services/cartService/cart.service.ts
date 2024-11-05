// src/app/services/cartService/cart.service.ts
import { Injectable } from '@angular/core';
import { Book } from 'src/app/model/Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Book[] = [];

  constructor() {
    // Carrega o carrinho do localStorage na inicialização
    const savedCart = sessionStorage.getItem('cartItems');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  getCartItems(): Book[] {
    return this.items;
  }

  addToCart(book: Book): void {
    this.items.push(book);
    this.saveCart();
  }

  // removeFromCart(bookId: number): void {
  //   this.items = this.items.filter(item => item.id !== bookId);
  //   this.saveCart();
  // }

  clearCart(): void {
    this.items = [];
    sessionStorage.removeItem('cartItems');
  }

  private saveCart(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }
}
