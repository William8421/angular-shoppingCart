import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userInfo: any = [];

  constructor(private userService: UserService) {}

  openCloseEditProfileModal = false;

  ngOnInit(): void {
    this.getUserInfo();
  }

  openEditProfileModal(): void {
    this.openCloseEditProfileModal = !this.openCloseEditProfileModal;
  }

  getUserInfo(): void {
    const user = this.userService.isLoggedIn();
    this.userService.getUserInfo(user).subscribe((item) => {
      this.userInfo = item;
    });
  }

  // handleUserInfoUpdated(updatedUserInfo: any): void {
  //   this.userInfo = updatedUserInfo;
  // }
}
