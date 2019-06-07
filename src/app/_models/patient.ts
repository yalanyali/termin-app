import { Address } from './address';
import { Appointment } from './appointment';
import { Prescription } from './prescription';

export class Patient {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    insuranceNumber: string;
    dateOfBirth: string;
    address: Address;
    appointments: Array<Appointment>;
    prescriptions: Array<Prescription>;
    diseaseIdList: String;
}

export const PatientColumns = [
    {
        id: "insuranceNumber",
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
        id: "gender",
        value: "Geschlecht"
    },
    {
        id: "dateOfBirth",
        value: "Geburtsdatum"
    }
];