import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from '../../store/facade/folder.facade';
import { ITournament } from '../../store/models/tournament';

@Component({
  selector: 'tournaments',
  templateUrl: 'tournaments.component.html',
  styleUrls: ['tournaments.component.scss']
})
export class TournamentsComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public selectedMonth = -1;
    public season = '2020/2021';
    public fromYear = '2020';
    public toYear = '2021';
    public showResults = false;

    public tournaments: ITournament[] = [];
    private tournaments$: Observable<ITournament[]>;
    private tournamentsSubs: Subscription;

    public months = [
        {label: 'СЕП', value: 8, clicked: false},
        {label: 'ОКТ', value: 9, clicked: false},
        {label: 'НОЕ', value: 10, clicked: false},
        {label: 'ДЕК', value: 11, clicked: false},
        {label: 'ЯНУ', value: 0, clicked: false},
        {label: 'ФЕВ', value: 1, clicked: false},
        {label: 'МАР', value: 2, clicked: false},
        {label: 'АПР', value: 3, clicked: false},
        {label: 'МАЙ', value: 4, clicked: false}
    ];
  constructor(public router: Router,
              private facade: FolderFacade,
              private toaster: ToasterService,
              private formBuilder: FormBuilder) {
    this.initForm();
    this.tournaments$ =  this.facade.tournaments$;
  }
  ngOnInit() {
    this.facade.getTournaments({season: this.season});

    this.tournamentsSubs = this.tournaments$.subscribe((data: ITournament[]) => {
      if(data) {
        if(data.length > 0) {
          this.tournaments = data;
          this.showResults = true;
        } else {
          this.tournaments = [];
          this.showResults = false;
          this.toaster.showToaster('Няма въведени турнири през този период', 'danger');
        }
        this.selectedMonth = -1;
      }
    });
  }

  changeFromDate(): void {
    this.form.controls['fromYear'].setValue(this.form.controls['fromYear'].value.substring(0,4));
    this.form.controls['toYear'].setValue((+this.form.controls['fromYear'].value + 1).toString());
    this.season = this.form.controls['fromYear'].value + '/' + this.form.controls['toYear'].value;
    this.selectedMonth = 0;
    const minYear = this.season.substring(0, 4);
    const maxYear = (+minYear + 1).toString();
    this.fromYear = this.fromYear.replace(/^.{4}/g, minYear);
    this.toYear = this.toYear.replace(/^.{4}/g, maxYear);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromYear: ['2020', Validators.required],
      toYear: ['2021', Validators.required]
    });
  }

  onSubmit(): void {
      let monthSearch = this.selectedMonth > -1 ? this.selectedMonth : null;
      let year: number;
      if (this.selectedMonth > -1) {
        if(this.selectedMonth < 5) {
          year = +this.toYear;
        } else {
          year = +this.fromYear;
        }
        this.months.forEach(element => {
          element.clicked = this.selectedMonth === element.value;
        });
        this.facade.getTournaments({month: monthSearch, year});
      } else {
        year = null;
        this.facade.getTournaments({season: this.season});
      }
  }

  chooseMonth(month: number): void {
    this.selectedMonth = month;
    this.months.forEach(element => {
      element.clicked = this.selectedMonth === element.value;
    });
  }

  ngOnDestroy(): void {
    this.tournamentsSubs.unsubscribe;
  }
}
