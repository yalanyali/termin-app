import { Medicine } from './medicine';

export class Prescription {
    id: Number;
    dateTime: string;
    medicine: Array<Medicine>;
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
        id: "dateTime",
        value: "Datum"
    }
];