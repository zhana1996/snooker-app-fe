import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/admin.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { AdminService } from "../services/admin.services";
import { IUser, IUserDetails } from "src/app/folder/store/models/players";
import { ToasterService } from "src/app/core/services/toaster/toaster.service";
import { ITournament } from "src/app/folder/store/models/tournament";
import { INews } from "src/app/folder/store/models/news";

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

  disabledUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getDisabledUsers),
      switchMap((actions) =>
        this.service.getDisabledUsers(actions.role).pipe(
          map((users: IUser[]) =>
            fromActions.getDissabledUsersSuccess({ users })
          ),
          catchError((error: Error) => [fromActions.getDissabledUsersError(error)])
        )
      )
    )
  );

  approveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.approveUser),
      switchMap((actions) =>
        this.service.approveUser(actions.userId).pipe(
          map((user: IUser) =>
            fromActions.approveUserSuccess({ user })
          ),
          catchError((error: Error) => [fromActions.approveUserError(error)])
        )
      )
    )
  );

  // Tournament

  createTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createTournament),
      switchMap((actions) =>
        this.service.createTournament(actions.tournament).pipe(
          map((tournament: ITournament) =>
            fromActions.createTournamentSuccess({ tournament })
          ),
          catchError((error: Error) => [fromActions.createTournamentError(error)])
        )
      )
    )
  );

  getTournaments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getTournaments),
      switchMap(({tournamentParams}) =>
        this.service.getTournaments(tournamentParams).pipe(
          map((tournaments: ITournament[]) =>
            fromActions.getTournamentsSuccess({ tournaments })
          ),
          catchError((error: Error) => [fromActions.getTournamentsError(error)])
        )
      )
    )
  );

  editTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editTournament),
      switchMap((actions) =>
        this.service.updateTournament(actions.tournament).pipe(
          map((tournament: ITournament) =>
            fromActions.editTournamentSuccess({ tournament })
          ),
          catchError((error: Error) => [fromActions.editTournamentError(error)])
        )
      )
    )
  );

  editTournirSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editTournamentSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно направихте промените', 'success')
      })
    ),
    {dispatch: false}
  );

  deleteTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteTournament),
      switchMap((actions) =>
        this.service.deleteTournament(actions.tournamentId).pipe(
          map((deleteTournament: ITournament) =>
            fromActions.deleteTournamentSuccess({ deleteTournament })
          ),
          catchError((error: Error) => [fromActions.deleteTournamentError(error)])
        )
      )
    )
  );

  shuffleUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.shuffleUsers),
      switchMap((action) =>
        this.service.shuffleUsers(action.id).pipe(
          map((shuffleUsers: Object) =>
            fromActions.shuffleUsersSuccess({ shuffleUsers })
          ),
          catchError((error: Error) => [fromActions.shuffleUsersError(error)])
        )
      )
    )
  );

  getTournamentByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getTournamentById),
      switchMap((action) =>
        this.service.getTournamentById(action.id).pipe(
          map((tournamentById: ITournament) =>
            fromActions.getTournamentByIdSuccess({ tournamentById })
          ),
          catchError((error: Error) => [fromActions.getTournamentByIdError(error)])
        )
      )
    )
  );

  // News
  createNews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.createNews),
    switchMap((action) =>
      this.service.createNews(action.news).pipe(
        map((createNews: Object) =>
          fromActions.createNewsSuccess({ createNews })
        ),
        catchError((error: Error) => [fromActions.createNewsError(error)])
      )
    )
  )
  );

  createNewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createNewsSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно създадохте статията', 'success')
      })
    ),
    {dispatch: false}
  );

  getAllNews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.getAllNews),
    switchMap(() =>
      this.service.getAllNews().pipe(
        map((news: INews[]) =>
          fromActions.getAllNewsSuccess({ news })
        ),
        catchError((error: Error) => [fromActions.getAllNewsError(error)])
      )
    )
  )
  );

  deleteNews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.deleteNews),
    switchMap((action) =>
      this.service.deleteNews(action.newsId).pipe(
        map((deleteNews: Object) =>
          fromActions.deleteNewsSuccess({ deleteNews })
        ),
        catchError((error: Error) => [fromActions.deleteNewsError(error)])
      )
    )
  )
  );

  deleteNewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteNewsSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно изтрихте статията', 'success')
      })
    ),
    {dispatch: false}
  );

  updateNews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.updateNews),
    switchMap((action) =>
      this.service.updateNews(action.news).pipe(
        map((updateNews: INews) =>
          fromActions.updateNewsSuccess({ updateNews })
        ),
        catchError((error: Error) => [fromActions.updateNewsError(error)])
      )
    )
  )
  );

  updateNewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateNewsSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно направихте промяната', 'success')
      })
    ),
    {dispatch: false}
  );
}
