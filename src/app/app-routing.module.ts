import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventFormComponent } from './event-form/event-form.component';
import { GuestFormComponent } from './guest-form/guest-form.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const routes: Routes = [
  { path: 'add-event', component: EventFormComponent },
  { path: 'add-guests', component: GuestFormComponent },
  { path: 'feedback', component: FeedbackFormComponent },
  { path: '', redirectTo: 'add-event', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
