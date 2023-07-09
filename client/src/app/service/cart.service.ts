import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product{
  itemName: string;
  price: number;
  imgUrl: string;
  itemId: number;
  owner: number;
  quantity: number
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems = this.cartItemsSubject.asObservable();
  private cartQuantitySubject = new BehaviorSubject<number>(0);
  cartQuantity = this.cartQuantitySubject.asObservable();

  constructor(private http: HttpClient) {}

  isLoggedIn(){
    return JSON.parse(localStorage.getItem('user')!)
  }

  addToCart(product: Product): void {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find((item) => item.itemId === product.itemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.quantity = 1;
      items.push(product);
    }

    this.cartItemsSubject.next([...items]);
    this.updateCartQuantity();
  }

  removeFromCart(product: Product): void {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex((item) => item.itemId === product.itemId);

    if (index !== -1) {
      items.splice(index, 1);
      this.cartItemsSubject.next([...items]);
      this.updateCartQuantity();
    }
  }

  updateCartItem(product: Product): void {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex((item) => item.itemId === product.itemId);

    if (index !== -1) {
      items[index].quantity = product.quantity;
      this.cartItemsSubject.next([...items]);
      this.updateCartQuantity();
    }
  }

  private updateCartQuantity(): void {
    const items = this.cartItemsSubject.value;
    let quantity = 0;

    for (const item of items) {
      quantity += item.quantity;
    }

    this.cartQuantitySubject.next(quantity);
  }
  storeItems() {
    return this.http.get(
      'https://shopping-cart-server-chi.vercel.app/items/allitems'
    );
  }

  
}
