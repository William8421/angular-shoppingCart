import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent{


  constructor(private userService: UserService){}

  @Input() selectedItem: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemsUpdate: EventEmitter<any> = new EventEmitter<any>();

  close(){
    this.closeModal.emit()
  }

  deleteItem(): void {
    this.userService.removeItem(this.selectedItem).subscribe(() => {
      this.itemsUpdate.emit()
    });
    this.close()
  }

}
