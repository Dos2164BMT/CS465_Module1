import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripData } from '../../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-list',
  imports: [RouterLink, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css',
})
export class TripList implements OnInit {
  trips: Trip[] = [];
  loading = true;
  errorMessage = '';

  constructor(private readonly tripData: TripData) {}

  ngOnInit(): void { this.loadTrips(); }

  loadTrips(): void {
    this.loading = true;
    this.errorMessage = '';
    this.tripData.getTrips().subscribe({
      next: (trips) => { this.trips = trips; this.loading = false; },
      error: () => {
        this.errorMessage = 'Trips could not be loaded. Confirm that Express and MongoDB are running.';
        this.loading = false;
      }
    });
  }

  deleteTrip(code: string): void {
    if (!window.confirm(`Delete trip ${code}?`)) return;
    this.tripData.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: () => this.errorMessage = `Trip ${code} could not be deleted.`
    });
  }

}
