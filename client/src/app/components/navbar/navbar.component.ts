import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck, OnInit {
  cartQuantity!: number;
  showCart: boolean = false;
  userIcon = ''
  constructor(private route: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartQuantity.subscribe((quantity) => {
      this.cartQuantity = quantity;
    });
  }

  ngDoCheck() {
    if (this.cartService.isLoggedIn()) {
      this.userIcon = this.cartService.isLoggedIn().username[0].toUpperCase()
      return true;
    }
    return false;
  }
  
  

  burger: string = 'close';
  menu: string = 'off';

  Switcher() {
    this.burger === 'close' && this.menu === 'off'
      ? ((this.burger = 'open'), (this.menu = 'on'))
      : ((this.burger = 'close'), (this.menu = 'off'));
  }

  logOut() {
    localStorage.removeItem('user');
    this.Switcher();
    this.route.navigate(['']);
  }
  toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
