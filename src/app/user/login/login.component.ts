import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserFacade } from '../store/facade/user.facade';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private logIn$: Observable<Object>;
  private logInSubs: Subscription;
  public logInMessage: Object;

  constructor(public router: Router,
              public formBuilder: FormBuilder,
              public facade: UserFacade,
              public route: ActivatedRoute) {
    this.initForm();
  }
  ngOnInit() {}

  ngOnDestroy(): void {}

  logIn(): void {
    this.facade.logInUser({
      username: this.form.controls['name'].value,
      password: this.form.controls['password'].value,
    });
    this.form.reset();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
