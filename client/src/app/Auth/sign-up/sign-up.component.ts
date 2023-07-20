import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private service: UserService, private route: Router) {}

  ngOnInit(): void {}

  hide = true;
  errorMessage: string = ''

  register(signUpData: any) {
    if (signUpData.valid) {
      this.service.register(signUpData.value).subscribe({
        next: (item: any) => {
          const { token, user } = item;
          const userStorage = {
            token: token,
            id: user.id,
            username: user.username,
          };
          localStorage.setItem('user', JSON.stringify(userStorage));
          this.route.navigate(['myprofile']);
        },
        error: (error: any) => {
          console.log(error.error.msg);
          this.errorMessage =
            error.error.msg || error.error.errors[0].msg;
          
        }
    });
    }
  }

  RedirectLogin() {
    this.route.navigate(['login']);
  }
}
