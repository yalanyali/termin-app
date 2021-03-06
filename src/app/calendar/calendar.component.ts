import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarDateFormatter } from 'angular-calendar';
import { addMinutes } from 'date-fns';
import { DayViewHour, DAYS_OF_WEEK } from 'calendar-utils';
import { AppointmentService } from '../_services/appointment.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../_models';
import { CustomDateFormatter } from './custom-date-formatter.provider';

import * as _moment from 'moment';
const moment = _moment;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

/**
 * Calendar view component.
 * 
 * Fetches `Appointment` data `onInit` to populate views.
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  view = 'month';
  viewDate: Date = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDayViewDate: Date;
  dayView: DayViewHour[];
  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  locale: string = 'de';

  events: Observable<Array<CalendarEvent<any>>>;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
      this.events = this.appointmentService.getAll()
      .pipe(
        // @ts-ignore: Appointment[] !== Appointment ???
        map((appointments: Appointment[]) => {
          console.log(appointments)
          return appointments.map((a: Appointment) => {
            const dateTime = moment(a.dateTime, 'DD.MM.YYYY HH:mm').toDate();
            return {
              title: `${a.patient.firstName} ${a.patient.lastName}`,
              color: colors.blue,
              start: dateTime,
              end: addMinutes(dateTime, 30)
            }
          });
        }));
  }

  viewChange(view: string) {
    this.view = view;
  }

  dayClicked(ev): void {
    // Ignore weekends
    if (ev.day.isWeekend) { return; }
    this.viewDate = ev.day.date;
    this.view = 'day';
    this.selectedMonthViewDay = ev.day;
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        if (
          this.selectedDayViewDate &&
          segment.date.getTime() === this.selectedDayViewDate.getTime()
        ) {
          segment.cssClass = 'cal-day-selected';
        }
      });
    });
  }
}
