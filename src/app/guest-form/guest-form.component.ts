import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Guest } from '../models/guest.model';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html'
})
export class GuestFormComponent {
  events: Event[] = [];
  selectedEventId: number | null = null;
  newGuest: Guest = { name: '', email: '', rsvpStatus: 'Maybe' };

  constructor(private eventService: EventService) {
    this.events = this.eventService.getEvents();
    this.selectedEventId = this.eventService.getSelectedEventId();
  }

  selectEvent(eventId: number | null) {
    if (eventId != null) {
      this.selectedEventId = eventId;
      this.eventService.selectEvent(eventId);
    }
  }

  addGuest() {
    if (!this.selectedEventId) return;
    this.eventService.addGuest(this.newGuest);
    this.newGuest = { name: '', email: '', rsvpStatus: 'Maybe' };
  }

  get selectedEvent(): Event | undefined {
    return this.eventService.getSelectedEvent();
  }
}
