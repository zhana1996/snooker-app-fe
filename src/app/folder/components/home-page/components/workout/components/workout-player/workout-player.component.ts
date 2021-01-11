import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from 'src/app/folder/store/facade/folder.facade';
import { IUser } from 'src/app/folder/store/models/players';
import { ITraining } from 'src/app/folder/store/models/trainings';

@Component({
  selector: 'workout-player',
  templateUrl: 'workout-player.component.html',
  styleUrls: ['../../workout.component.scss']
})
export class WorkoutPlayerComponent implements OnInit, OnDestroy {
  public showResults = false;
  public form: FormGroup;
  public player_id: string;

  public trainings: ITraining[] = [];
  private trainings$: Observable<ITraining[]>;
  private trainingsSubs: Subscription;

  public trainers: IUser[] = [];
  private trainers$: Observable<IUser[]>;
  private trainersSubs: Subscription;

  constructor(private facade: FolderFacade,
              private toaster: ToasterService,
              private formBuilder: FormBuilder) {
    this.initForm();
    this.player_id = localStorage.getItem('id');
    this.trainings$ = this.facade.trainings$;
    this.trainers$ = this.facade.trainers$;
  }
  ngOnInit(): void {
    this.facade.getTrainers();
    
    this.trainingsSubs = this.trainings$.subscribe((data: ITraining[]) => {
      if(data) {
        if(data.length > 0) {
          this.trainings = data;
          // отделна заявка за свободните САМО
          this.showResults = true;
        } else {
          this.trainings = [];
          this.showResults = false;
          this.toaster.showToaster('Няма свободни тренировки за избрания от вас треньор', 'danger');
        }
        this.facade.resetTrainings();
      }
    });

    this.trainersSubs = this.trainers$.subscribe((data: IUser[]) => {
      if(data) {
        if(data.length > 0) {
          this.trainers = data;
          this.form.controls['userId'].setValue(this.trainers[0].id);
        } else {
          this.trainers = [];
        }
      }
    });

    this.form.get('userId').valueChanges.subscribe(data => {
      if(data) {
        this.facade.getTrainings(data);
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userId: ['', Validators.required]});
  }

  applyTraining(training_id): void {
    this.facade.applyTraining({
      trainingId: training_id,
      playerId: this.player_id
    });
    setTimeout(() => {
      this.facade.getTrainings(this.form.value['userId']);
    }, 1500);
  }

  ngOnDestroy(): void {
    this.trainingsSubs.unsubscribe();
    this.trainersSubs.unsubscribe();
  }
  
}
