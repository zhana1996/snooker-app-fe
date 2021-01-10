import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'add-new-event',
  templateUrl: 'add-new-event.component.html',
  styleUrls: ['../../../../workout.component.scss']
})
export class AddNewEventComponent {
  @Output() eventObject: EventEmitter<any> = new EventEmitter();
  @Input() event;
  public minDate = new Date().toISOString();

  constructor() {}

  addEvent(): void {
    this.eventObject.emit(this.event);
  }
}