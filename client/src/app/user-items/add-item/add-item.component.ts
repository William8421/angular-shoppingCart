import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  constructor(private userService: UserService, private http: HttpClient){}

  

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemsUpdate: EventEmitter<void> = new EventEmitter<void>();

  close(){
    this.closeModal.emit()
  }

  
  uploaded: string = '';
  imgSelected: File | undefined;
  user = this.userService.isLoggedIn()


  imageHandler(event: Event){
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imgSelected = fileInput.files[0];
    };
    
  }

  uploadImage(){
    const formData = new FormData();
    if(this.imgSelected !== undefined)
    formData.append("file", this.imgSelected);
        formData.append("upload_preset", "WilliamMallak");
        formData.append("upload_name", "denpxdokx");
        formData.append('folder', 'shopping-cart');
        
        this.http.post( "https://api.cloudinary.com/v1_1/denpxdokx/image/upload",
        formData).subscribe((response: any) => {          
          this.uploaded = response.secure_url;
        })
        
        
  }

  reset(){
    return this.imgSelected = undefined 
  }

  

  addItem(newItem: any): void {
    if (newItem.valid) {
      newItem = {
        userId: this.user.id,
        itemName: newItem.value.itemName,
        price: newItem.value.price,
        imgUrl: this.uploaded
      };
      this.userService.addItem(newItem).subscribe(() => {
        this.itemsUpdate.emit();
      });
      this.close()
      this.reset()
    }
  }
}
