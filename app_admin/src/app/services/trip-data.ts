import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripData {
  private readonly tripsUrl = '/api/trips';

  constructor(private readonly http: HttpClient) {}

  getTrips(): Observable<Trip[]> { return this.http.get<Trip[]>(this.tripsUrl); }
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${encodeURIComponent(code)}`);
  }
  addTrip(trip: Trip): Observable<Trip> { return this.http.post<Trip>(this.tripsUrl, trip); }
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${encodeURIComponent(trip.code)}`, trip);
  }
  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.tripsUrl}/${encodeURIComponent(code)}`);
  }
}
