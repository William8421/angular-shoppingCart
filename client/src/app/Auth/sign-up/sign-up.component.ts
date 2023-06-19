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

  response: any;

  register(signUpData: any) {
    if (signUpData.valid) {
      this.service.register(signUpData.value).subscribe({
        next: (item: any) => {
          this.response = item;
          if (this.response.token) {
            localStorage.setItem('token', this.response.token);
            this.route.navigate(['']);
          }
        },
        error(Err) {
          console.log(Err.error.msg);
          if (Err.error.msg) {
            alert(Err.error.msg);
          } else {
            alert(Err.error.errors[0].msg);
          }
        },
      });
    }
  }

  RedirectLogin() {
    this.route.navigate(['login']);
  }
}
