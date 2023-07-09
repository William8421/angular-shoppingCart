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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserItemsComponent } from './user-items/user-items.component';

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
    EditProfileComponent,
    UserItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
