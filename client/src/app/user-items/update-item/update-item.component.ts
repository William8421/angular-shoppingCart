import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserItemProps } from 'src/app/models';
import { UserService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent{
  constructor(private userService: UserService, private http: HttpClient){}


  @Input()
  selectedItem!: UserItemProps;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemsUpdate: EventEmitter<void> = new EventEmitter<void>();


  close(){
    this.closeModal.emit()
  }  

  imgSelected!: File;
  uploaded: string = '';

  imageHandler(event: Event){
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imgSelected = fileInput.files[0];
    }
  }

  uploadImage(){
    const formData = new FormData();
    formData.append("file", this.imgSelected);
        formData.append("upload_preset", "WilliamMallak");
        formData.append("upload_name", "denpxdokx");
        formData.append('folder', 'shopping-cart');
        
        this.http.post( "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData).subscribe((response: any) => {          
          this.uploaded = response.secure_url;
        })
        
        
  }

  updateItem(item: any){
    const selectedItem = {
      itemId: this.selectedItem.itemId,
      itemName: item.value.updateItemName || this.selectedItem!.itemName,
      price: item.value.updatePrice || this.selectedItem!.price,
      imgUrl: this.uploaded || this.selectedItem!.imgUrl
    };
    
    this.userService.updateItem(selectedItem).subscribe(() => {
    this.itemsUpdate.emit();
    });    
    this.close()    
  }
  
}
