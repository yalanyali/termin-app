import { AppointmentRecord } from './appointment-record'
import { Patient } from './patient';

export class Appointment {
    id: Number;
    // datetime: string;
    dateTime: string;
    description: string;
    appointmentRecord: AppointmentRecord;
    patient: Patient;
}

export const AppointmentColumns = [
    {
        id: "id",
        value: "#"
    },
    {
        id: "firstName",
        value: "Vorname"
    },
    {
        id: "lastName",
        value: "Name"
    },
    {
        id: "dateTime",
        value: "Datum"
    },
    {
        id: "description",
        value: "Beschwerde"
    },
];