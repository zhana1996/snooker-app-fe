import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'months',
  templateUrl: 'months.component.html',
  styleUrls: ['months.component.scss']
})
export class MonthsComponent implements OnInit {
  public form: FormGroup;
  public selectedMonth = 0;
  public months = [
    {label: 'СЕПTЕМВРИ', value: 9},
    {label: 'ОКТОМВРИ', value: 10},
    {label: 'НОЕМВРИ', value: 11},
    {label: 'ДЕКЕМВРИ', value: 12},
    {label: 'ЯНУАРИ', value: 1},
    {label: 'ФЕВРУАРИ', value: 2},
    {label: 'МАРТ', value: 3},
    {label: 'АПРИЛ', value: 4},
    {label: 'МАЙ', value: 5}
];

  constructor(public router: Router,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute) {
    this.initFom();
              }
  ngOnInit() {}

  goToTournaments(month: string): void {
    this.selectedMonth = +month;
    this.onSubmit();
  }

  changeFromDate(): void {
    this.form.controls['fromYear'].setValue(this.form.controls['fromYear'].value.substring(0,4));
    this.form.controls['toYear'].setValue((+this.form.controls['fromYear'].value + 1).toString());
  }

  private initFom(): void {
    this.form = this.formBuilder.group({
      fromYear: ['2020', Validators.required],
      toYear: ['2021', Validators.required]
    });
  }

  onSubmit(): void {
    const formObj = this.form.value;
    console.log({
      fromYear: formObj['fromYear'],
      toYear: formObj['toYear'],
      month: this.selectedMonth > 0 ? this.selectedMonth : ''
  });
  this.router.navigate(['../month-tournaments/month/' + this.selectedMonth.toString() ], { relativeTo: this.route });
  }
}
