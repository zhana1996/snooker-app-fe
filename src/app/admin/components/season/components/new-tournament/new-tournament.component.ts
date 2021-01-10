import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { ITournament } from 'src/app/folder/store/models/tournament';

@Component({
  selector: 'new-tournament',
  templateUrl: 'new-tournament.component.html',
  styleUrls: ['new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit{
  private _tournament: ITournament;
  @Input() season: string;
  @Input() edit: boolean;
  public newTournamentForm: FormGroup;
  public minDate = '2020-09-01';
  public maxDate = '2021-05-30'

  @Input()
  get tournament(): ITournament {
    return this._tournament;
  }
  set tournament(value: ITournament) {
    if (value) {
      this.newTournamentForm.patchValue(value);
      this._tournament = value;
    }
  }

  constructor(private formBuilder: FormBuilder,
              private popoverController: PopoverController,
              private facade: AdminFacade) {
    this.initForm();
  }

  ngOnInit(): void {
    const minYear = this.season.substring(0, 4);
    const maxYear = (+minYear + 1).toString();
    this.minDate = this.minDate.replace(/^.{4}/g, minYear);
    this.maxDate = this.maxDate.replace(/^.{4}/g, maxYear);
  }

  private initForm(): void {
    this.newTournamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  createTournament(): void {
    let tournament = this.newTournamentForm.value;
    tournament['season'] = this.season;
    if (this.edit) {
      tournament['id'] = this._tournament.id;
      this.facade.editTournament(tournament);
    } else {
      this.facade.createTournament(tournament);
    }
    this.popoverController.dismiss();
    setTimeout(() => {
      this.facade.getTournaments({season: this.season});
    }, 1500);
  }
}
