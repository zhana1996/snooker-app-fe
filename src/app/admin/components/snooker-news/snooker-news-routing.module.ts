import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnookerNewsComponent } from './snooker-news.component';

const routes: Routes = [
  {
    path: '',
    component: SnookerNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnookerNewsRoutingModule {}
