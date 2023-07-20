import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { MaterialModule } from 'src/Material.Module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { UserComponent } from './user/user.component';
import { UserItemsComponent } from './user-items/user-items.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AddItemComponent } from './user-items/add-item/add-item.component';
import { DeleteItemComponent } from './user-items/delete-item/delete-item.component';
import { UpdateItemComponent } from './user-items/update-item/update-item.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    AboutComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    CartComponent,
    UserComponent,
    UserItemsComponent,
    EditProfileComponent,
    AddItemComponent,
    DeleteItemComponent,
    UpdateItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
