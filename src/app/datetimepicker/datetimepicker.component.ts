import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatDatepickerInputEvent } from '@angular/material';

import * as moment_ from 'moment';

const moment = moment_;

import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

class DateConfig {
  startView: 'month' | 'year' | 'multi-year';
  touchUi: boolean;
  minDate: moment_.Moment;
  maxDate: moment_.Moment;
  startDate: Date;
}

/**
 * A flexible component for time and date pickers.
 */
@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css']
})
export class DatetimepickerComponent implements OnInit {

  /**
  * Placeholder text for date input.
  */
  @Input() placeholderDate: string;
  /**
  * Placeholder text for date input.
  */
  @Input() placeholderTime: string;
  @Input() model: Date;
  @Input() purpose: string;
  /**
  * No time picker when true.
  */
  @Input() dateOnly: boolean;
  /**
  * Time picker pops up directly after render when true.
  */
  @Input() autoOpen: boolean = false;

  @Output() dateUpdate = new EventEmitter<Date>();
  @Output() timeUpdate = new EventEmitter<Date>();

  public pickerId: string = "_" + Math.random().toString(36).substr(2, 9);

  public dateForm: FormControl;
  public timeFormGroup: FormGroup;
  public selectedTime: FormControl;

  public momentDate: moment_.Moment;
  public config: DateConfig;

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#FFF',
        buttonColor: '#3F51B5'
    },
    dial: {
        dialBackgroundColor: '#3F51B5',
    },
    clockFace: {
        clockFaceBackgroundColor: '#F0F0F0',
        clockHandColor: '#3F51B5',
        clockFaceTimeInactiveColor: 'carbon'
    }
  };

  constructor(private adapter: DateAdapter<any>) { }

  ngOnInit() {

    this.adapter.setLocale("de-DE");
    this.config = new DateConfig();
    if (this.purpose === "birthday") {
      this.config.startView = 'multi-year';
      this.config.maxDate = moment();//.add(-15, 'year');
      this.config.minDate = moment().add(-130, 'year');
      this.config.startDate = new Date(1980, 6, 15);
      this.dateOnly = true;
    }
    else {
      this.config.startView = 'month';
      this.config.maxDate = moment().add(100, 'year');
      this.config.minDate = moment().add(-100, 'year');
    }

    // if (window.screen.width < 767) {
      this.config.touchUi = true;
    // }

    if (this.model) {
      var mom = moment(this.model);
      if (mom.isBefore(moment('1900-01-01'))) {
        this.momentDate = moment();
      } else {
        this.momentDate = mom;
      }
    } else {
      this.momentDate = moment();
    }

    this.dateForm = new FormControl(this.config.startDate || this.momentDate);

    this.selectedTime = new FormControl(this.momentDate.format("HH:mm"));

    this.timeFormGroup = new FormGroup({
      selectedTime: this.selectedTime
    });


  }


  public dateChange(date: MatDatepickerInputEvent<any>) {

    if (moment.isMoment(date.value)) {
      this.momentDate = moment(date.value);
      if (this.dateOnly) {
        this.momentDate = this.momentDate.utc(true);
      }
      var newDate = this.momentDate.toDate();
      this.model = newDate;
      this.dateUpdate.emit(newDate);
    }
        
    // console.log("datechange", date);
  }

  public timeChange(time: string) {

    var splitted = time.split(':');
    var hour = splitted[0];
    var minute = splitted[1];

    // console.log("time change", time);
    this.momentDate = this.momentDate.set('hour', parseInt(hour));
    this.momentDate = this.momentDate.set('minute', parseInt(minute));

    var newDate = this.momentDate.toDate();
    this.model = newDate;
    this.timeUpdate.emit(newDate);
  }
}