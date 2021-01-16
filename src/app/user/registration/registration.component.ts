import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFacade } from '../store/facade/user.facade';

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent{
  public form: FormGroup;

  constructor(public router: Router,
              public facade: UserFacade,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute) {
    this.initForm();
  }

  createNewUserProfile(): void {
    let user = this.form.value;
    this.facade.createNewUser({
      username: user['userName'],
      email: user['email'],
      password: user['password'],
      role: user['role'],
      userDetails: {
        name: user['name'],
        gender: user['gender'],
        age: +user['age'],
        break: +user['break'],
        club: user['club'],
        startDate: user['startPeriod'],
        image: ''
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      club: ['', Validators.required],
      age: ['', Validators.required],
      break: ['', Validators.required],
      email: ['', Validators.required],
      startPeriod: ['', Validators.required]
    });
  }
}
