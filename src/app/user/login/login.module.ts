import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { UserStoreModule } from '../store/user-store.module';
import { UserService } from '../store/services/user.services';
import { UserFacade } from '../store/facade/user.facade';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    UserStoreModule
  ],
  declarations: [
   LoginComponent
],
  providers: [UserService, UserFacade]
})
export class LoginModule {}
