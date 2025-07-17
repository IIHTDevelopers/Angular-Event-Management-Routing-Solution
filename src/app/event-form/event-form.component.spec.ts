import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventFormComponent } from './event-form.component';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { By } from '@angular/platform-browser';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let mockEventService: { addEvent: jest.Mock };

  beforeEach(async () => {
    mockEventService = {
      addEvent: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [EventFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render all input fields and submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
      expect(compiled.querySelector('input[name="date"]')).toBeTruthy();
      expect(compiled.querySelector('input[name="time"]')).toBeTruthy();
      expect(compiled.querySelector('input[name="venue"]')).toBeTruthy();
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    });

    it('should bind form inputs to event model', async () => {
      const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
      nameInput.value = 'Test Event';
      nameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.event.name).toBe('Test Event');
    });

    it('should call addEvent() on form submit and reset the form', () => {
      // Fill in the event
      component.event = {
        name: 'My Event',
        date: '2025-12-31',
        time: '18:00',
        venue: 'Test Venue'
      };

      // Submit form
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', {});
      fixture.detectChanges();

      // Expect the service to be called
      expect(mockEventService.addEvent).toHaveBeenCalledWith({
        name: 'My Event',
        date: '2025-12-31',
        time: '18:00',
        venue: 'Test Venue'
      });

      // Form should be reset
      expect(component.event).toEqual({ name: '', date: '', time: '', venue: '' });
    });
  });
});
