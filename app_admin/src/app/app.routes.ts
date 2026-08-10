import { Routes } from '@angular/router';
import { TripList } from './components/trip-list/trip-list';
import { TripForm } from './components/trip-form/trip-form';

export const routes: Routes = [
  { path: '', component: TripList, title: 'Trips | Travlr Admin' },
  { path: 'add', component: TripForm, title: 'Add Trip | Travlr Admin' },
  { path: 'edit/:code', component: TripForm, title: 'Edit Trip | Travlr Admin' },
  { path: '**', redirectTo: '' }
];
