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

  title = 'something';

  login(loginData: any) {
    if (loginData.valid) {
      this.service.sigIn(loginData.value).subscribe({
        next: (item: any) => {
          this.response = item;

          if (this.response) {
            localStorage.setItem('token', this.response.token);
            this.route.navigate(['']);
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
