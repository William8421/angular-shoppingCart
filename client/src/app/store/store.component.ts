import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CartService } from '../service/cart.service';
import { CartItemProps } from '../models';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private userService: UserService, private cartService: CartService) {}

  items!: CartItemProps[];

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.userService.storeItems().subscribe((item: any) => {
      this.items = item;
      
    });
  }

  addToCart(cartItem: CartItemProps): void {
    this.cartService.addToCart(cartItem);
  }

  removeFromCart(cartItem: CartItemProps): void {
    this.cartService.removeFromCart(cartItem);
    cartItem.quantity = 0
  }

  increaseQuantity(cartItem: CartItemProps): void {
    cartItem.quantity++;
    this.cartService.updateCartItem(cartItem);
  }

  decreaseQuantity(cartItem: CartItemProps): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.updateCartItem(cartItem);
    } else {
      this.removeFromCart(cartItem);
      cartItem.quantity = 0;
    }
  }
}
