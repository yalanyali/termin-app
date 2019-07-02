import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Patient } from '../_models';
import { PatientService } from '../_services';

/**
 * "Home" component.
 * 
 * Renders `CalendarComponent` inside a `ContentCard`.
 * 
 * Planned as a home dashboard component.
 */
@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    // patients: Patient[] = [];

    constructor(private patientService: PatientService) {}

    ngOnInit() {
        // this.patientService.getAll().pipe(first()).subscribe(patients => { 
        //     this.patients = patients;
        // });
    }
}