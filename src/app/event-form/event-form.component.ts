import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent {
  event: Event = { name: '', date: '', time: '', venue: '' };

  constructor(private eventService: EventService) {}

  addEvent() {
    this.eventService.addEvent(this.event);
    this.event = { name: '', date: '', time: '', venue: '' }; // reset form
  }
}
