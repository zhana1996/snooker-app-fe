import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoachApproveRoutingModule } from './coach-approve-routing.module';
import { CoachApproveComponent } from './coach-approve.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoachApproveRoutingModule
  ],
  declarations: [
   CoachApproveComponent
],
  providers: []
})
export class CoachApproveModule {}
