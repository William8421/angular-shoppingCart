import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}

  hide = true;
  errorMessage: string = ''

  login(loginData: any) {
    if (loginData.valid) {
      this.userService.sigIn(loginData.value).subscribe({
        next: (item: any) => {
          const { user, token } = item;
          const userStorage = {
            username: user.username,
            token: token,
            id: user.id,
          };
          localStorage.setItem('user', JSON.stringify(userStorage));
          this.route.navigate(['myprofile']);
        },
        error: (error: any) => {
          this.errorMessage = error.error.msg
        },
      });
    }
  }

  RedirectRegister() {
    this.route.navigate(['signup']);
  }

}
