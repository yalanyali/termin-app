import { Medicine } from './medicine';
import { Patient } from './patient';

export class Prescription {
    id: Number;
    dateTime: string;
    medicine: Array<Medicine>;
    patient: Patient;
    constructor() {
        // Initialize an empty array
        this.medicine = new Array<Medicine>();
    }
}

export const PrescriptionColumns = [
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
    }
];