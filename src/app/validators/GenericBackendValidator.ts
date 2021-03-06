import { AbstractControl } from '@angular/forms';
import { map, switchMapTo } from 'rxjs/operators';
import { PatientService } from '../_services';
import { timer, of } from 'rxjs';

/**
 * Server-side unique value validation controller.
 */
export class ValidateUniqueValues {
  static createValidator(patientService: PatientService, type: string, valueToExclude: string = '') {
    return (control: AbstractControl) => {
      // Return directly when value is to be excluded (Validation expects Promise or Observable type)
      if (control.value === valueToExclude) { return of(null)}

      // Angular unsubscribes to the previous Observable before calling the validator function and subscribing to the new Observable.
      // timer returns cold Observable, as the Observable is unsubscribed when a new value is sent for checking,
      // the timeout is cleared before the call is made and the input gets effectively debounced before validation check.
      return timer(500).pipe(
        switchMapTo(patientService.checkUniqueValue(control.value, type)),
        map(res => {
          return res["unique"] ? null : { notUnique: true }
        })
      )
    }
  }
}