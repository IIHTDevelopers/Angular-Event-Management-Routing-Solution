import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FeedbackFormComponent } from './feedback-form.component';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { By } from '@angular/platform-browser';

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;
  let mockEventService: {
    getEvents: jest.Mock;
    getSelectedEventId: jest.Mock;
    selectEvent: jest.Mock;
    getSelectedEvent: jest.Mock;
    addFeedback: jest.Mock;
  };

  const mockEvents: Event[] = [
    { id: 1, name: 'Event A', date: '2025-08-01', time: '10:00', venue: 'Hall A' },
    { id: 2, name: 'Event B', date: '2025-08-02', time: '12:00', venue: 'Hall B' },
  ];

  beforeEach(async () => {
    mockEventService = {
      getEvents: jest.fn().mockReturnValue(mockEvents),
      getSelectedEventId: jest.fn().mockReturnValue(1),
      selectEvent: jest.fn(),
      getSelectedEvent: jest.fn().mockReturnValue(mockEvents[0]),
      addFeedback: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [FeedbackFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the dropdown and form inputs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('select')).toBeTruthy();
      expect(compiled.querySelector('input[name="guestEmail"]')).toBeTruthy();
      expect(compiled.querySelector('textarea[name="comments"]')).toBeTruthy();
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should populate event dropdown', () => {
      const options = fixture.debugElement.queryAll(By.css('select option'));
      // +1 for default disabled option
      expect(options.length).toBe(mockEvents.length + 1);
      expect(options[1].nativeElement.textContent).toContain('Event A');
      expect(options[2].nativeElement.textContent).toContain('Event B');
    });

    it('should call selectEvent() when event is selected', () => {
      const select = fixture.debugElement.query(By.css('select')).nativeElement;
      select.value = select.options[2].value; // select Event B
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(mockEventService.selectEvent).toHaveBeenCalledWith(2);
    });

    it('should submit feedback and clear form', () => {
      component.selectedEventId = 1;
      component.guestEmail = 'test@example.com';
      component.comments = 'Great event!';

      component.submitFeedback();

      expect(mockEventService.addFeedback).toHaveBeenCalledWith({
        guestEmail: 'test@example.com',
        comments: 'Great event!'
      });

      expect(component.guestEmail).toBe('');
      expect(component.comments).toBe('');
    });

    it('should display selected event summary', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Event A');
      expect(compiled.textContent).toContain('2025-08-01');
      expect(compiled.textContent).toContain('10:00');
      expect(compiled.textContent).toContain('Hall A');
    });
  });
});
