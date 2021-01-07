import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonCheckbox } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { UserFacade } from '../store/facade/user.facade';

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: IonCheckbox;
  @ViewChild('coach') coach: IonCheckbox;
  public form: FormGroup;

  private createNewUser$: Observable<Object>;
  private createNewUserSubs: Subscription;
  public createNewUser: Object;

  constructor(public router: Router,
              public facade: UserFacade,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute) {
                this.initForm();
              }
  ngOnInit() {}

  ngOnDestroy(): void {}

  createNewUserProfile(): void {
    let user = this.form.value;
    console.log({
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
        startDate: new Date(user['startPeriod']),
        image: ''
      }
    });
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
        startDate: new Date(user['startPeriod']),
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
