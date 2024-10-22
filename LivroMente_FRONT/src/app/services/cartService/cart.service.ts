import { Injectable } from '@angular/core';

interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  addToCart(productId: number) {
    const existingItem = this.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ productId, quantity: 1 });
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}