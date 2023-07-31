import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck, OnInit {
  cartQuantity = 0;
  showCart = false;
  userIcon = '';
  burger = 'close';
  menu = 'off';

  constructor(private route: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartQuantity.subscribe(quantity => {
      this.cartQuantity = quantity;
    });
    
  }

  ngDoCheck(): boolean {
    if (this.cartService.isLoggedIn()) {
      this.userIcon = this.cartService.isLoggedIn().username[0].toUpperCase();
      return true;
    }
    return false;
  }

  toggleSwitcher(): void {
    this.burger = this.burger === 'close' ? 'open' : 'close';
    this.menu = this.menu === 'off' ? 'on' : 'off';
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.toggleSwitcher();
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
  
  emptyCart(){
    this.cartQuantity = 0
  }
}
