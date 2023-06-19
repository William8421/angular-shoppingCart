import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private service: UserService) {}

  response: any;

  ngOnInit(): void {
    this.service.storeItems().subscribe((item: any) => {
      this.response = item;
    });
  }
}
