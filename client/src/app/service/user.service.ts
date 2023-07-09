import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isLoggedIn(){
    return JSON.parse(localStorage.getItem('user')!)
  }

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

  getUserInfo(user: any) {
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/user/getinfo', user
    );
    
  }

  editUserInfo(newData: any){
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/user/updateprofile', newData
    )    
  }

  userItems(userId: number){
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/items/useritems', userId
    )
  }

  addItem(newItem: any){
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/items/additems', newItem
    )
  }

  removeItem(item: any){
    return this.http.post(
      'https://shopping-cart-server-chi.vercel.app/items/removeitem', item
    )
  }

}
