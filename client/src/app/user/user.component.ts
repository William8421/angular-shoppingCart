import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  userInfo!: any
  
  constructor(private userService: UserService, private route: Router){}
  
  user = this.userService.isLoggedIn()
  ngOnInit(): void {
    this.userService.getUserInfo(this.user).subscribe((item) => {
      this.userInfo = item;     
    })
  }
  editProfile(){
    this.route.navigate(['editprofile']);
  }
}
