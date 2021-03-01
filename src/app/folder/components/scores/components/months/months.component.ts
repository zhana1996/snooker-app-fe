import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'months',
  templateUrl: 'months.component.html',
  styleUrls: ['months.component.scss']
})
export class MonthsComponent {
  public form: FormGroup;
  public selectedMonth = -1;
  public season = '2020/2021';
  public months = [
    {label: 'СЕПTЕМВРИ', value: 8},
    {label: 'ОКТОМВРИ', value: 9},
    {label: 'НОЕМВРИ', value: 10},
    {label: 'ДЕКЕМВРИ', value: 11},
    {label: 'ЯНУАРИ', value: 0},
    {label: 'ФЕВРУАРИ', value: 1},
    {label: 'МАРТ', value: 2},
    {label: 'АПРИЛ', value: 3},
    {label: 'МАЙ', value: 4}
];

  constructor(public router: Router,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute) {
    this.initFom();
  }

  changeFromDate(): void {
    const fromDate = this.form.controls['fromYear'].value.substring(0,4);
    this.form.controls['toYear'].setValue((+fromDate + 1).toString());
    this.season = fromDate + '/' + this.form.controls['toYear'].value;
  }

  searchTournament(month: number): void {
    this.selectedMonth = month;
      let year: number;
      if(this.selectedMonth < 5) {
        year = +this.form.controls['toYear']['value'];
      } else {
        year = +this.form.controls['fromYear']['value'];
      }
      this.router.navigate(['../month-tournaments/month/' + this.selectedMonth.toString() + '/year/' + year ], { relativeTo: this.route });
  }

  private initFom(): void {
    this.form = this.formBuilder.group({
      fromYear: ['2020', Validators.required],
      toYear: ['2021', Validators.required]
    });
  }
}
