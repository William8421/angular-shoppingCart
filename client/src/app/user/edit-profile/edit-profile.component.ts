import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  oldUserInfo: any = [];

  user: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() userInfoUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.isLoggedIn();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo(this.user).subscribe((item) => {
      this.oldUserInfo = item;
    });
  }

  editInfo(newData: any): void {
    newData = {
      id: this.user.id,
      username: newData.value.username || this.oldUserInfo[0].username,
      firstName: newData.value.firstName || this.oldUserInfo[0].firstName,
      lastName: newData.value.lastName || this.oldUserInfo[0].lastName
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
