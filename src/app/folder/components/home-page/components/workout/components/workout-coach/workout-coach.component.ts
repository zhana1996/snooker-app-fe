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
  coach_id: string;
  collapseCard = false;
  viewTitle = '';
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    eventColor: '',
    allDay: false
  }

  minDate = new Date().toISOString();
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  trainings: ITraining[] = [];
  showAddNewTraining = false;

  private trainings$: Observable<ITraining[]>;
  private trainingsSubs: Subscription;

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
            let start = new Date(this.trainings[i].startDate);
            start.setHours(start.getHours() - 2);
            let end = new Date(this.trainings[i].endDate);
            end.setHours(end.getHours() - 2);
            let title: string;
            let description: string;
            if (this.trainings[i].participant) {
              title = `${this.trainings[i].title} - ${this.trainings[i].participant.player.userDetails.name}`;
              description = `Тренировката e запазена от играча ${this.trainings[i].participant.player.userDetails.name}`;
            } else {
              title = this.trainings[i].title;
              description = this.trainings[i].description;
            }
            this.eventSource.push({
              title: title,
              desc: description,
              startTime:  start,
              endTime: end,
              allDay: false
            });
          }
          this.myCal.loadEvents();
          this.resetEvent();
        } else {
          this.trainings = [];
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.trainingsSubs.unsubscribe();
  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
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
    let start = new Date(this.event.startTime);
    start.setHours(start.getHours() + 2);
    let end = new Date(this.event.endTime);
    end.setHours(end.getHours() + 2);
    this.facade.createTraining(this.coach_id, {
      title: this.event.title,
      description: this.event.desc,
      startDate: start,
      endDate: end
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
}
