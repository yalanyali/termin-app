import { Medicine } from './medicine';

export class Prescription {
    id: Number;
    datetime: Date;
    medicine: Array<Medicine>;
}