import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserInfoProps } from '../models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: UserInfoProps = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  openCloseEditProfileModal = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
    
  }

  toggleEditProfileModal(): void {
    this.openCloseEditProfileModal = !this.openCloseEditProfileModal;
  }

  getUserInfo(): void {
    const user = this.userService.isLoggedIn();
    this.userService.getUserInfo(user).subscribe((item: UserInfoProps) => {
      this.userInfo = item;
    });
  }
}
