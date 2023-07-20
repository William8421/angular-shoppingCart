import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItemProps, UserLocalStorage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItemProps[]>([]);
  cartItems = this.cartItemsSubject.asObservable();
  private cartQuantitySubject = new BehaviorSubject<number>(0);
  cartQuantity = this.cartQuantitySubject.asObservable();

  constructor(private http: HttpClient) {}

  isLoggedIn(): UserLocalStorage {
    return JSON.parse(localStorage.getItem('user')!);
  }

  addToCart(cartItem: CartItemProps): void {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find((item) => item.itemId === cartItem.itemId);
    

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItem.quantity = 1;
      items.push(cartItem);
    }

    this.updateCart(items);
  }

  removeFromCart(cartItem: CartItemProps): void {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex((item) => item.itemId === cartItem.itemId);

    if (index !== -1) {
      items.splice(index, 1);
      this.updateCart(items);
    }
  }

  updateCartItem(cartItem: CartItemProps): void {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex((item) => item.itemId === cartItem.itemId);

    if (index !== -1) {
      items[index].quantity = cartItem.quantity;
      this.updateCart(items);
    }
  }

  private updateCart(items: CartItemProps[]): void {
    this.cartItemsSubject.next([...items]);
    this.updateCartQuantity(items);
  }

  private updateCartQuantity(items: CartItemProps[]): void {
    const quantity = items.reduce((total, item) => total + item.quantity, 0);
    this.cartQuantitySubject.next(quantity);
  }
}
