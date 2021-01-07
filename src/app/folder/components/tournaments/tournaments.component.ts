import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'tournaments',
  templateUrl: 'tournaments.component.html',
  styleUrls: ['tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
    public form: FormGroup;
    public selectedMonth = 0;
    public tournaments = [
        {
            "name": "Ранконг Турнир No1",
            "location": "The Academy, София",
            "date": "22/10/2020"
        },
        {
            "name": "Ранконг Турнир No2",
            "location": "Stix, София",
            "date": "19/11/2020"
        }
    ];
    public months = [
        {label: 'СЕП', value: 9},
        {label: 'ОКТ', value: 10},
        {label: 'НОЕ', value: 11},
        {label: 'ДЕК', value: 12},
        {label: 'ЯНУ', value: 1},
        {label: 'ФЕВ', value: 2},
        {label: 'МАР', value: 3},
        {label: 'АПР', value: 4},
        {label: 'МАЙ', value: 5}
    ];
  constructor(public router: Router,
              private formBuilder: FormBuilder) {
    this.initForm();
    this.onSubmit();
    }
  ngOnInit() {}

  changeFromDate(): void {
    this.form.controls['fromYear'].setValue(this.form.controls['fromYear'].value.substring(0,4));
    this.form.controls['toYear'].setValue((+this.form.controls['fromYear'].value + 1).toString());
    this.selectedMonth = 0;
    this.onSubmit();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromYear: ['2020', Validators.required],
      toYear: ['2021', Validators.required]
    });
  }

  onSubmit(month?: number) {
      const formObj = this.form.value;
      if (month) {
        this.selectedMonth = month;
      }
      console.log({
          fromYear: formObj['fromYear'],
          toYear: formObj['toYear'],
          month: this.selectedMonth > 0 ? this.selectedMonth : ''
      });
  }
}
