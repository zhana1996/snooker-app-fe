import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/user.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { UserService } from "../services/user.services";
import { Router } from "@angular/router";
import { ToasterService } from "src/app/core/services/toaster/toaster.service";
import { IUser } from "src/app/folder/store/models/players";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private toaster: ToasterService,
              private router: Router,
              private service: UserService) {}

  createNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createUser),
      switchMap((action) =>
        this.service.createNewUser(action.user).pipe(
          map((user: IUser) =>
            fromActions.createUserSuccess({ user })
          ),
          catchError((error: Error) => [fromActions.createUserError(error)])
        )
      )
    )
  );

  createNewUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createUserSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешна регистрация', 'success')
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1500);
      })
    ),
    {dispatch: false}
  );

  createNewError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createUserError),
      tap((error)=> {
        this.toaster.showToaster(error['error'].message, 'danger')
      })
    ),
    {dispatch: false}
  );

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.logInUser),
      switchMap((action) =>
        this.service.logIn(action.user).pipe(
          map((logIn: Object) =>
            fromActions.logInUserSuccess({ logIn })
          ),
          catchError((error: Error) => [fromActions.logInUserError(error)])
        )
      )
    )
  );

  logInUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.logInUserSuccess),
      tap(({logIn})=> {
        localStorage.setItem('accessToken', logIn['accessToken']);
        const user = this.service.getUser();
        localStorage.setItem('role', user['role']);
        localStorage.setItem('id', user['id']);
        if (user['role'] === 'ADMIN') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigate(['folder/homePage']);
        }
      })
    ),
    {dispatch: false}
  );

  logInUserError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.logInUserError),
      tap((error)=> {
        this.toaster.showToaster(error['error'].message, 'danger')
      })
    ),
    {dispatch: false}
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.uploadImage),
      switchMap(({ imageBlob, imageName }) =>
        this.service.uploadImage(imageBlob, imageName).pipe(
          map((response) => fromActions.uploadImageSuccess({ response })),
          catchError((error: Error) => [
            fromActions.uploadImageFailed(error),
          ])
        )
      )
    )
  );
}
