import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent{
  constructor(private userService: UserService){}


  @Input()
  selectedItem: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemsUpdate: EventEmitter<any> = new EventEmitter<any>();


  close(){
    this.closeModal.emit()
  }  

  updateItem(item: any){
    const selectedItem = {
      itemId: this.selectedItem.itemId,
      itemName: item.value.updateItemName || this.selectedItem!.itemName,
      price: item.value.updatePrice || this.selectedItem!.price,
      imgUrl: item.value.updateImgUrl || this.selectedItem!.imgUrl
    };
    this.userService.updateItem(selectedItem).subscribe(() => {
    this.itemsUpdate.emit();
    });    
    this.close()    
  }
  
}
