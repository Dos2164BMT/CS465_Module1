import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripData } from '../../services/trip-data';

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
})
export class TripForm implements OnInit {
  trip: Trip = this.emptyTrip();
  editMode = false;
  loading = false;
  saving = false;
  errorMessage = '';

  constructor(private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly tripData: TripData) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) return;
    this.editMode = true;
    this.loading = true;
    this.tripData.getTrip(code).subscribe({
      next: (trip) => { this.trip = { ...trip, start: trip.start.substring(0, 10) }; this.loading = false; },
      error: () => { this.errorMessage = `Trip ${code} could not be loaded.`; this.loading = false; }
    });
  }

  save(form: NgForm): void {
    if (form.invalid) { form.control.markAllAsTouched(); return; }
    this.saving = true;
    this.errorMessage = '';
    const request = this.editMode ? this.tripData.updateTrip(this.trip) : this.tripData.addTrip(this.trip);
    request.subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => { this.errorMessage = error.error?.message || 'The trip could not be saved.'; this.saving = false; }
    });
  }

  private emptyTrip(): Trip {
    return { code: '', name: '', length: '', start: '', resort: '', perPerson: '', image: 'reef1.jpg', description: '' };
  }

}
