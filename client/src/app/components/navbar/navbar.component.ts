import { Component, DoCheck, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  constructor(private route: Router, public service: UserService) {}

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
