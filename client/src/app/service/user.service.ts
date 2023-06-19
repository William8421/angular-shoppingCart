import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  sigIn(inputData: any): any {
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/user/signin',
      inputData
    );
  }

  register(inputData: any) {
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/user/signup',
      inputData
    );
  }

  storeItems() {
    return this.http.get(
      'https://shopping-cart-server-chi.vercel.app/items/allitems'
    );
  }
}
