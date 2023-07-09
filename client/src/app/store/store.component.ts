import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CartService, Product } from '../service/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private service: UserService, private cartService: CartService) {}

  items!: Product[];

  ngOnInit(): void {
    this.service.storeItems().subscribe((item: any) => {
      this.items = item;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    product.quantity = 0
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
    this.cartService.updateCartItem(product);
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartService.updateCartItem(product);
    } else {
      this.removeFromCart(product);
      product.quantity = 0;
    }
  }
}
