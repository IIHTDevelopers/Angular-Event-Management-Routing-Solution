import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent {
  events: Event[] = [];
  selectedEventId: number | null = null;
  guestEmail: string = '';
  comments: string = '';

  constructor(private eventService: EventService) {
    this.events = this.eventService.getEvents();
    this.selectedEventId = this.eventService.getSelectedEventId();
  }

  selectEvent(eventId: number | null) {
    if (eventId !== null) {
      this.eventService.selectEvent(eventId);
      this.selectedEventId = eventId;
    }
  }

  submitFeedback() {
    if (!this.selectedEventId) return;
    this.eventService.addFeedback({ guestEmail: this.guestEmail, comments: this.comments });
    this.guestEmail = '';
    this.comments = '';
  }

  get selectedEvent(): Event | undefined {
    return this.eventService.getSelectedEvent();
  }
}
