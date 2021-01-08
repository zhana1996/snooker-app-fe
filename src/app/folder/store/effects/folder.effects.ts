import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/folder.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToasterService } from "src/app/core/services/toaster/toaster.service";
import { FolderService } from "../services/folder.services";
import { IUser } from "../models/players";

@Injectable()
export class FolderEffects {
  constructor(private actions$: Actions,
              private toaster: ToasterService,
              private router: Router,
              private service: FolderService) {}

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
}
