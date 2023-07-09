import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private service: UserService, private route: Router) {}

  ngOnInit(): void {}

  response: any;

  hide = true;

  login(loginData: any) {
    
    if (loginData.valid) {
      this.service.sigIn(loginData.value).subscribe({
        next: (item: any) => {
          this.response = item;

          if (this.response) {
            const userStorage = {
              username: this.response.user.username,
              token: this.response.token,
              id: this.response.user.id
            }
            
            localStorage.setItem('user', JSON.stringify(userStorage));
            this.route.navigate(['myprofile']);
          }
        },
        error(Err: { error: { msg: string } }) {
          alert(Err.error.msg);
        },
      });
    }
  }

  RedirectRegister() {
    this.route.navigate(['signup']);
  }
}
