import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { Observable, Subscription } from 'rxjs';
import { FolderFacade } from 'src/app/folder/store/facade/folder.facade';
import { ITraining } from 'src/app/folder/store/models/trainings';

@Component({
  selector: 'workout-coach',
  templateUrl: 'workout-coach.component.html',
  styleUrls: ['../../workout.component.scss']
})
export class WorkoutCoachComponent implements OnInit, OnDestroy {
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  public coach_id: string;
  public collapseCard = false;
  public viewTitle = '';
  public event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    eventColor: '',
    allDay: false
  }

  public minDate = new Date().toISOString();
  public eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  public trainings: ITraining[] = [];
  private trainings$: Observable<ITraining[]>;
  private trainingsSubs: Subscription;

  public showAddNewTraining = false;

  constructor(@Inject(LOCALE_ID) private locale: string,
              private facade: FolderFacade,
              private alertCtrl: AlertController) {
    this.trainings$ = this.facade.trainings$;
  }

  ngOnInit(): void {
    this.coach_id = localStorage.getItem('id');
    this.facade.getTrainings(this.coach_id);
    this.resetEvent();

    this.trainingsSubs = this.trainings$.subscribe((data: ITraining[]) => {
      if(data) {
        this.eventSource = [];
        if(data.length > 0) {
          this.trainings = data;
          for(let i = 0; i < this.trainings.length; i ++) {
            this.eventSource.push({
              title: this.trainings[i].title,
              desc: this.trainings[i].description,
              startTime:  new Date(this.trainings[i].startDate),
              endTime: new Date(this.trainings[i].endDate),
              eventColor: this.trainings[i].description === 'Свободна' ? '#3a87ad' : '',
              allDay: false
            });
          }
          console.log(this.eventSource);
          this.myCal.loadEvents();
          this.resetEvent();
        } else {
          this.trainings = [];
        }
      }
    });

  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();

  }

  onViewTitleChanged(title): void {
    this.viewTitle = title;
  }

  onTimeSelected(event): void {
    let selected = new Date(event.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  resetEvent(): void {
    this.event = {
      title: '',
      desc: '',
      eventColor: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    }
  }

  addEvent(event: ITraining): void {
    let addEvent = {
      title: event.title,
      description: event.description,
      startTime: new Date(event.startDate),
      endTime: new Date(event.endDate),
      allDay: false
    };
    this.eventSource.push(addEvent);
    this.facade.createTraining(this.coach_id, {
      title: this.event.title,
      description: this.event.desc,
      startDate: new Date(this.event.startTime),
      endDate: new Date(this.event.endTime)
    });
    this.myCal.loadEvents();
    this.resetEvent();
    setTimeout(() => {
      this.facade.getTrainings(this.coach_id);
    }, 1500);
  }

  changeMode(mode: string): void {
    this.calendar.mode = mode;
  }

  back(): void {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(): void {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(): void {
    this.calendar.currentDate = new Date();
  }

  ngOnDestroy(): void {
    this.trainingsSubs.unsubscribe();
  }
}
