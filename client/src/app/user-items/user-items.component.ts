import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

type UserItem = {
  itemId: number;
  itemName: string;
  price: number;
  imgUrl: string;
  owner?: number;
}

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  userItems: UserItem[] = [];
  @Input() selectedItem: UserItem = {
    itemId: 0,
    itemName: '',
    price: 0,
    imgUrl: ''
  } ;
  openCloseDeleteModal = false;
  openCloseAddItemModal = false;
  openCloseUpdateItemModal = false;

  constructor(private userService: UserService) {}

  user = this.userService.isLoggedIn()

  ngOnInit(): void {
    this.loadUserItems();
  }


  loadUserItems(): void {
    this.userService.userItems(this.user).subscribe((items: any) => {
      this.userItems = items;
      
    });    
  }

  openDeleteModal(item: any): void {
    this.openCloseDeleteModal = !this.openCloseDeleteModal;
    this.selectedItem = item;
    
  }

  openAddModal(): void {
    this.openCloseAddItemModal = !this.openCloseAddItemModal;
  }

  openUpdateItemModal(item: any): void {
    this.openCloseUpdateItemModal = !this.openCloseUpdateItemModal;
    this.selectedItem = item;
       
  }

  // addItem(newItem: any): void {
  //   if (newItem.valid) {
  //     const user = this.userService.isLoggedIn();
  //     const itemData = {
  //       userId: user.id,
  //       itemName: newItem.value.itemName,
  //       price: newItem.value.price,
  //       imgUrl: newItem.value.imgUrl
  //     };
  //     this.userService.addItem(itemData).subscribe(() => {
  //       this.loadUserItems();
  //     });
  //     this.openCloseAddItemModal = false;
  //   }
  // }
}
