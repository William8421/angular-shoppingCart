import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  constructor(private userService: UserService, private route: Router){}
  
  user = this.userService.isLoggedIn()  
  userItems: any

  openCloseDeleteModal: boolean = false
  selectedItem: any = {}
  
  openCloseAddItemModal: boolean = false 

  
  ngOnInit(): void {
    this.loadUserItems()    
  }

  loadUserItems(): void {
    this.userService.userItems(this.user).subscribe((items) => {
      this.userItems = items;
    })    
  }

  openDeleteModal(item: any){
    this.openCloseDeleteModal = !this.openCloseDeleteModal
    this.selectedItem = item    
  }

  openAddModal(){
    this.openCloseAddItemModal = !this.openCloseAddItemModal
  }

  deleteItem(){    
    this.userService.removeItem(this.selectedItem).subscribe(() => {
      this.loadUserItems()
    })
    this.openCloseDeleteModal = false
  }

  addItem(newItem: any){
    if(newItem.valid){
      newItem = {
        userId: this.user.id,
        itemName: newItem.value.itemName,
        price: newItem.value.price,
        imgUrl: newItem.value.imgUrl
      }
      this.userService.addItem(newItem).subscribe(() => {
        this.loadUserItems()
      })
      this.openCloseAddItemModal = false
    }
  }

  

  redirectAddItem(){
    this.route.navigate(['additem'])
  }
}
