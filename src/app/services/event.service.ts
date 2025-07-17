import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Guest } from '../models/guest.model';
import { Feedback } from '../models/feedback.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private events: Event[] = [];
    private selectedEventId: number | null = null;
    private guests: { [eventId: number]: Guest[] } = {};
    private feedbacks: { [eventId: number]: Feedback[] } = {};
    private idCounter = 1;

    addEvent(event: Event) {
        const eventWithId = { ...event, id: this.idCounter++ };
        this.events.push(eventWithId);
        this.selectedEventId = eventWithId.id;
        this.guests[eventWithId.id] = [];
        this.feedbacks[eventWithId.id] = [];
    }

    getEvents() {
        return this.events;
    }

    selectEvent(eventId: number) {
        this.selectedEventId = eventId;
    }

    getSelectedEvent(): Event | undefined {
        return this.events.find(e => e.id === this.selectedEventId!);
    }

    addGuest(guest: Guest) {
        if (this.selectedEventId) {
            this.guests[this.selectedEventId].push({ ...guest });
        }
    }

    getGuests(): Guest[] {
        return this.selectedEventId ? this.guests[this.selectedEventId] : [];
    }

    addFeedback(feedback: Feedback) {
        if (this.selectedEventId) {
            this.feedbacks[this.selectedEventId].push({ ...feedback });
        }
    }

    getFeedbacks(): Feedback[] {
        return this.selectedEventId ? this.feedbacks[this.selectedEventId] : [];
    }

    getSelectedEventId(): number | null {
        return this.selectedEventId;
    }
}
