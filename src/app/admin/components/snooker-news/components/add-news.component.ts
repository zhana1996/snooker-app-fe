import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-news',
  templateUrl: 'add-news.component.html',
  styleUrls: ['add-news.component.scss']
})
export class AddNewsComponent {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      img: ['', Validators.required],
      url: ['', Validators.required]
    });
  }
}
