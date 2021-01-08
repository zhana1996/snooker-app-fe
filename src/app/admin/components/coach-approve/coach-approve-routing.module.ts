import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachApproveComponent } from './coach-approve.component';

const routes: Routes = [
  {
    path: '',
    component: CoachApproveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachApproveRoutingModule {}
