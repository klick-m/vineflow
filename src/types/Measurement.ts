
import { Timestamp } from 'firebase/firestore';

export type MeasurementSource = 'MANUAL' | 'ISPINDEL';

export interface Measurement {
    id?: string;
    timestamp: Timestamp | Date;
    brix: number;
    sg: number;       // Specific Gravity
    ph: number;
    temp: number;     // Celsius
    notes: string;
    source: MeasurementSource;
}
