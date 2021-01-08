import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/admin.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { AdminService } from "../services/admin.services";
import { IUser, IUserDetails } from "src/app/folder/store/models/players";
import { ToasterService } from "src/app/core/services/toaster/toaster.service";

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions,
              private toaster: ToasterService,
              private service: AdminService) {}

  getAllPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getAllPlayers),
      switchMap((actions?) =>
        this.service.getAllPlayers(actions.gender).pipe(
          map((players: IUser[]) =>
            fromActions.getAllPlayersSuccess({ players })
          ),
          catchError((error: Error) => [fromActions.getAllPlayersError(error)])
        )
      )
    )
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updatePlayer),
      switchMap((actions) =>
        this.service.updatePlayer(actions.userDetails).pipe(
          map((player: IUserDetails) =>
            fromActions.updatePlayerSuccess({ player })
          ),
          catchError((error: Error) => [fromActions.updatePlayerError(error)])
        )
      )
    )
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deletePlayer),
      switchMap((actions) =>
        this.service.deletePlayer(actions.userId).pipe(
          map((user: IUser) =>
            fromActions.deletePlayerSuccess({ user })
          ),
          catchError((error: Error) => [fromActions.deletePlayerError(error)])
        )
      )
    )
  );

  deletePlayerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deletePlayerSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно изтрихте потребителя', 'success')
      })
    ),
    {dispatch: false}
  );
}