import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { UserStoreModule } from '../store/user-store.module';
import { UserFacade } from '../store/facade/user.facade';
import { UserService } from '../store/services/user.services';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    UserStoreModule
  ],
  declarations: [
   RegistrationComponent
],
  providers: [UserFacade, UserService]
})
export class RegistrationModule {}
