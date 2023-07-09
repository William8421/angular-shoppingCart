import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

  constructor(private userService: UserService, private route: Router) {}
  oldUserInfo: any
  
  ngOnInit(): void {
    this.userService.getUserInfo(this.user).subscribe((item) => {
      this.oldUserInfo = item;     
    })
  }

  user = this.userService.isLoggedIn()
 

  test(){
    console.log(this.oldUserInfo[0].username);    
  }

  editInfo(newData: any){
    newData = {
      id: this.user.id,
      username: newData.value.username || this.oldUserInfo[0].username,
      firstName: newData.value.firstName || this.oldUserInfo[0].firstName,
      lastName: newData.value.lastName || this.oldUserInfo[0].lastName
    }
      this.userService.editUserInfo(newData).subscribe()
    
    this.route.navigate(['myprofile']);
  }

  backToProfile(){
    this.route.navigate(['myprofile'])
  }
}
