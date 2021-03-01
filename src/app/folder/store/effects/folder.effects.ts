import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/folder.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToasterService } from "src/app/core/services/toaster/toaster.service";
import { FolderService } from "../services/folder.services";
import { IUser } from "../models/players";
import { ITraining } from "../models/trainings";
import { IEarliestTournament, ITournament } from "../models/tournament";
import { INews } from "../models/news";

@Injectable()
export class FolderEffects {
  constructor(private actions$: Actions,
              private toaster: ToasterService,
              private router: Router,
              private service: FolderService) {}

  getAllPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getAllPlayers),
      switchMap((actions) =>
        this.service.getAllPlayers(actions.gender).pipe(
          map((players: IUser[]) =>
            fromActions.getAllPlayersSuccess({ players })
          ),
          catchError((error: Error) => [fromActions.getAllPlayersError(error)])
        )
      )
    )
  );

  // Trainings
  
  createTraining$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.createTraining),
    switchMap((actions) =>
      this.service.createTraining(actions.userId, actions.training).pipe(
        map((training: Object) =>
          fromActions.CreateTrainingSuccess({ training })
        ),
        catchError((error: Error) => [fromActions.CreateTrainingError(error)])
      )
    )
  )
);

  getTrainings$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.getTrainings),
    switchMap((actions) =>
      this.service.getTrainings(actions.userId).pipe(
        map((trainings: ITraining[]) =>
          fromActions.getTrainingsSuccess({ trainings })
        ),
        catchError((error: Error) => [fromActions.getTrainingsError(error)])
      )
    )
  )
  );

  getTrainers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.getTrainers),
    switchMap(() =>
      this.service.getTrainers().pipe(
        map((trainers: IUser[]) =>
          fromActions.getTrainersSuccess({ trainers })
        ),
        catchError((error: Error) => [fromActions.getTrainersError(error)])
      )
    )
  )
  );

  applyTraining$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.applyTraining),
    switchMap((action) =>
      this.service.applyTraining(action.participats_ids).pipe(
        map((training: Object) =>
          fromActions.applyTrainingSuccess({ training })
        ),
        catchError((error: Error) => [fromActions.applyTrainingError(error)])
      )
    )
  )
  );

  applyTrainingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.applyTrainingSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно записахте тренировка', 'success')
      })
    ),
    {dispatch: false}
  );

  getEarliestTournament$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.getEarliestTournament),
    switchMap(() =>
      this.service.getEarliestTournament().pipe(
        map((tournament: IEarliestTournament) =>
          fromActions.getEarliestTournamentSuccess({ tournament })
        ),
        catchError((error: Error) => [fromActions.getEarliestTournamentError(error)])
      )
    )
  )
  );

  // Add and Delete player to/from Tournament

  addPlayerToTournament$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.addPlayerToTournament),
    switchMap((action) =>
      this.service.addPlayerToTournament(action.tournamentParticipant).pipe(
        map((addResponse: Object) =>
          fromActions.addPlayerToTournamentSuccess({ addResponse })
        ),
        catchError((error: Error) => [fromActions.addPlayerToTournamentError(error)])
      )
    ))
  );

  addPlayerToTournamentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addPlayerToTournamentSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно се записахте за турнира', 'success')
      })
    ),
    {dispatch: false}
  );
  
  deletePlayerFromTournament$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.deletePlayerFromTournament),
    switchMap((action) =>
      this.service.deletePlayerFromTournament(action.tournamentId).pipe(
        map((deleteResponse: Object) =>
          fromActions.deletePlayerFromTournamentSuccess({ deleteResponse })
        ),
        catchError((error: Error) => [fromActions.deletePlayerFromTurnamentError(error)])
      )
    )
  )
  );

  deletePlayerFromTournamentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deletePlayerFromTournamentSuccess),
      tap(()=> {
        this.toaster.showToaster('Успешно се отписахте от турнира', 'success')
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

  getAllUsersByTitles$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.getAllUsersByTitles),
    switchMap(() =>
      this.service.getAllUsersByTitles().pipe(
        map((users: IUser[]) =>
          fromActions.getAllUsersByTitlesSucces({ users })
        ),
        catchError((error: Error) => [fromActions.getAllUsersByTitlesError(error)])
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
}
