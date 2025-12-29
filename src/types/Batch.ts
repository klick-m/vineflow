
import { Timestamp } from 'firebase/firestore';

export type BatchType = 'RED' | 'WHITE' | 'FRUIT';
export type BatchStatus = 'MACERATION' | 'ACTIVE_FERMENTATION' | 'SECONDARY_FERMENTATION' | 'AGING' | 'BOTTLED';

export interface Batch {
    id: string;
    name: string;
    type: BatchType;
    status: BatchStatus;
    rawWeight: number;    // kg
    currentVolume: number; // liters
    targetAbv: number;    // %
    createdAt: Timestamp | Date;
}
