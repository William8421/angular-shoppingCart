import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  constructor(private route: Router) {}

  ngDoCheck() {
    if (localStorage.getItem('token')) {
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
    localStorage.removeItem('token');
    this.Switcher();
    this.route.navigate(['']);
  }
}
