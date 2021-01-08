import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFacade } from '../store/facade/user.facade';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent{
  public form: FormGroup;

  constructor(public router: Router,
              public formBuilder: FormBuilder,
              public facade: UserFacade,
              public route: ActivatedRoute) {
    this.initForm();
  }

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
