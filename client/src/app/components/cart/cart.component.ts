import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartItemProps } from 'src/app/models';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItemProps[] = [];
  items!: CartItemProps[];

  
  constructor(private cartService: CartService, private userService: UserService, private route: Router) {}
  user = this.userService.isLoggedIn()

  @Output() closeCart: EventEmitter<void> = new EventEmitter<void>();

  @Output() cartQuantity: EventEmitter<void> = new EventEmitter<void>()

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
    });

    this.userService.storeItems().subscribe((item: any) => {
      this.items = item
    })
    
  }

  updateCartItem(cartItem: CartItemProps, quantity: number): void {
    cartItem.quantity += quantity;
    if (cartItem.quantity < 1) {
      this.removeFromCart(cartItem);
    } else {
      this.cartService.updateCartItem(cartItem);
    }
  }

  removeFromCart(cartItem: CartItemProps): void {
    this.cartService.removeFromCart(cartItem);
    cartItem.quantity = 0;
  }

  emptyCart(){    
    this.cartQuantity.emit();    
    return this.cartItems = [];
  }
  

  total(){

    return this.cartItems.reduce((total, cartItem) => {
      const item = this.items.find((i: any) => i.itemId === cartItem.itemId)
      return total + (item?.price || 0) * cartItem.quantity 
    }, 0)
  } 

  ngDoCheck(): boolean {
    if (this.cartService.isLoggedIn()) {
      return true;
    }
    return false;
  }

  checkout(){
    if(!this.ngDoCheck()){
      this.toggleCart()
      return this.route.navigate(['login'])
    }else{
      this.toggleCart()
      return this.route.navigate(['shipping'])
    }
  }

  toggleCart(): void {
    this.closeCart.emit();
  }
}
