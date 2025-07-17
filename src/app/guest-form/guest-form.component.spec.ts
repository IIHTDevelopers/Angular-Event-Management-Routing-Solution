import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GuestFormComponent } from './guest-form.component';
import { EventService } from '../services/event.service';
import { By } from '@angular/platform-browser';
import { Event } from '../models/event.model';

describe('GuestFormComponent', () => {
  let component: GuestFormComponent;
  let fixture: ComponentFixture<GuestFormComponent>;
  let mockEventService: {
    getEvents: jest.Mock;
    getSelectedEventId: jest.Mock;
    selectEvent: jest.Mock;
    getSelectedEvent: jest.Mock;
    addGuest: jest.Mock;
  };

  const mockEvents: Event[] = [
    { id: 1, name: 'Launch Party', date: '2025-09-01', time: '18:00', venue: 'Auditorium' },
    { id: 2, name: 'Hackathon', date: '2025-09-02', time: '10:00', venue: 'Lab 3' }
  ];

  beforeEach(async () => {
    mockEventService = {
      getEvents: jest.fn().mockReturnValue(mockEvents),
      getSelectedEventId: jest.fn().mockReturnValue(1),
      selectEvent: jest.fn(),
      getSelectedEvent: jest.fn().mockReturnValue(mockEvents[0]),
      addGuest: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [GuestFormComponent],
      imports: [FormsModule],
      providers: [{ provide: EventService, useValue: mockEventService }]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should render dropdown and guest form fields', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('select')).toBeTruthy();
      expect(compiled.querySelector('input[name="guestName"]')).toBeTruthy();
      expect(compiled.querySelector('input[name="guestEmail"]')).toBeTruthy();
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should populate dropdown with events', () => {
      const options = fixture.debugElement.queryAll(By.css('select option'));
      expect(options.length).toBe(mockEvents.length + 1); // +1 for default option
      expect(options[1].nativeElement.textContent).toContain('Launch Party');
      expect(options[2].nativeElement.textContent).toContain('Hackathon');
    });

    it('should call selectEvent on dropdown change', () => {
      const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;
      selectEl.value = selectEl.options[2].value;
      selectEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(mockEventService.selectEvent).toHaveBeenCalledWith(2);
    });

    it('should submit guest and reset form', () => {
      component.selectedEventId = 1;
      component.newGuest.name = 'Alice';
      component.newGuest.email = 'alice@example.com';

      component.addGuest();

      expect(mockEventService.addGuest).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
        rsvpStatus: 'Maybe'
      });

      expect(component.newGuest).toEqual({ name: '', email: '', rsvpStatus: 'Maybe' });
    });

    it('should display selected event summary', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Launch Party');
      expect(compiled.textContent).toContain('2025-09-01');
      expect(compiled.textContent).toContain('18:00');
      expect(compiled.textContent).toContain('Auditorium');
    });
  });
});
