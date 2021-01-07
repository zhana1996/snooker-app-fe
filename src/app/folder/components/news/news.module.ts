import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule
  ],
  declarations: [NewsComponent],
  providers: []
})
export class NewsModule {}
