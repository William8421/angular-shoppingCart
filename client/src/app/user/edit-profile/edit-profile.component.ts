import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInfoProps } from 'src/app/models';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  oldUserInfo: UserInfoProps = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  user = this.userService.isLoggedIn();

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() userInfoUpdated: EventEmitter<UserInfoProps> = new EventEmitter<UserInfoProps>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo(this.user).subscribe((item: UserInfoProps) => {
      this.oldUserInfo = item;
    });
  }

  editInfo(newData: any): void {
    newData = {
      id: this.user.id,
      username: newData.value.username || this.oldUserInfo.username,
      firstName: newData.value.firstName || this.oldUserInfo.firstName,
      lastName: newData.value.lastName || this.oldUserInfo.lastName
    };

    this.userService.editUserInfo(newData).subscribe(() => {
      this.getUserInfo();
      this.userInfoUpdated.emit(this.oldUserInfo);
    });

    this.close();
  }

  close(): void {
    this.closeModal.emit();
  }
}
