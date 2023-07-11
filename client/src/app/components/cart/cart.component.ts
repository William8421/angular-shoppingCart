import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Product } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: any[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    product.quantity = 0;
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
    this.cartService.updateCartItem(product);    
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartService.updateCartItem(product);
    }else {
      this.removeFromCart(product);
      product.quantity = 0;
    }
  }
  @Output() closeCart : EventEmitter<void> = new EventEmitter<void>()


  toggleCart(){
    this.closeCart.emit()
  }
}
