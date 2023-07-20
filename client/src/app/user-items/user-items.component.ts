import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserItemProps } from '../models';



@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  
  constructor(private userService: UserService) {}

  userItems: UserItemProps[] = [];
  @Input() selectedItem: UserItemProps = {
    itemId: 0,
    itemName: '',
    price: 0,
    imgUrl: ''
  } ;
  openCloseDeleteModal = false;
  openCloseAddItemModal = false;
  openCloseUpdateItemModal = false;


  user = this.userService.isLoggedIn()

  ngOnInit(): void {
    this.loadUserItems();
    
  }


  loadUserItems(): void {
    this.userService.getUserItems(this.user).subscribe((items: any) => {
      this.userItems = items;
      
    });    
  }

  openDeleteModal(item: UserItemProps): void {
    this.openCloseDeleteModal = !this.openCloseDeleteModal;
    this.selectedItem = item;
    
  }

  openAddModal(): void {
    this.openCloseAddItemModal = !this.openCloseAddItemModal;
  }

  openUpdateItemModal(item: UserItemProps): void {
    this.openCloseUpdateItemModal = !this.openCloseUpdateItemModal;
    this.selectedItem = item;
       
  }

}
