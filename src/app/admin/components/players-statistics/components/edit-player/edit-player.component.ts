import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-player',
  templateUrl: 'edit-player.component.html',
  styleUrls: ['edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {   
    public playerForm: FormGroup; 
    constructor(private formBuilder: FormBuilder) {
        this.initForm();
    }
    ngOnInit() {}

    private initForm(): void {
        this.playerForm = this.formBuilder.group({
          break: [''],
          rank: [''],
          wins: [''],
          losts: [''],
          matches: [''],
          titles: [''],
          points: [''],
          location: ['']
        });
      }
}
