import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  constructor(private userService: UserService){}

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemsUpdate: EventEmitter<any> = new EventEmitter<any>();

  close(){
    this.closeModal.emit()
  }

  addItem(newItem: any): void {
    if (newItem.valid) {
      const user = this.userService.isLoggedIn();
      const itemData = {
        userId: user.id,
        itemName: newItem.value.itemName,
        price: newItem.value.price,
        imgUrl: newItem.value.imgUrl
      };
      this.userService.addItem(itemData).subscribe(() => {
        this.itemsUpdate.emit();
      });
      this.close()
    }
  }
}
