import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoProps, UserItemProps } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  baseURL = 'https://shopping-cart-server-chi.vercel.app'

  sigIn(inputData: any) {
    return this.http.post(`${this.baseURL}/user/signin`, inputData);
  }

  register(inputData: any) {
    return this.http.post(`${this.baseURL}/user/signup`, inputData);
  }

  storeItems() {
    return this.http.get( `${this.baseURL}/items/allitems`);
  }

  getUserInfo(user: UserInfoProps) {
    return this.http.post<UserInfoProps>(`${this.baseURL}/user/getinfo`, user);
  }

  editUserInfo(newData: UserInfoProps) {
    return this.http.post<UserInfoProps>(`${this.baseURL}/user/updateprofile`, newData);
  }

  getUserItems(userId: number) {
    return this.http.post(`${this.baseURL}/items/useritems`, userId);
  }

  addItem(newItem: any) {
    return this.http.post(`${this.baseURL}/items/additems`, newItem);
  }

  removeItem(item: any) {
    return this.http.post(`${this.baseURL}/items/removeitem`, item);
  }

  updateItem(item: UserItemProps) {
    return this.http.post(`${this.baseURL}/items/updateitem`, item);
  }
}
