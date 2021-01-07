import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'new-tournament',
  templateUrl: 'new-tournament.component.html',
  styleUrls: ['new-tournament.component.scss']
})
export class NewTournamentComponent {
  private _tournament: Object;
  public newTournamentForm: FormGroup;

  @Input()
  get tournament(): Object {
    return this._tournament;
  }
  set tournament(value: Object) {
    if (value) {
      this.newTournamentForm.patchValue(value);
      this._tournament = value;
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.newTournamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
}
