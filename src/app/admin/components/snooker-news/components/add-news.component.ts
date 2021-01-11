import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { INews } from 'src/app/folder/store/models/news';

@Component({
  selector: 'add-news',
  templateUrl: 'add-news.component.html',
  styleUrls: ['add-news.component.scss']
})
export class AddNewsComponent {
  private _news: INews;
  @Input() edit: boolean;
  public form: FormGroup;

  @Input()
  get news(): INews {
    return this._news;
  }
  set news(value: INews) {
    if (value) {
      this.form.patchValue(value);
      this._news = value;
    }
  }

  constructor(private formBuilder: FormBuilder,
              private popoverController: PopoverController,
              private facade: AdminFacade) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  createNews(): void {
    const news = this.form.value;
    if (this.edit) {
      this.facade.updateNews({
        id: this._news.id,
        title: news['title'],
        url: news['url'],
        image: news['image']
      });
    } else {
      this.facade.createNews({
        title: news['title'],
        url: news['url'],
        image: news['image']
      });
    }
    this.popoverController.dismiss();
    setTimeout(() => {
      this.facade.getAllNews();
    }, 1500);
  }
}
