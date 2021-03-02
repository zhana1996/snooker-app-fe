import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfileRoutingModule } from './myProfile-routing.module';
import { MyProfileComponent } from './myProfile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyProfileRoutingModule
  ],
  declarations: [MyProfileComponent],
  providers: []
})
export class MyProfileModule {}
