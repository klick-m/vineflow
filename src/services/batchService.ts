
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
    QuerySnapshot
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Batch } from '../types/Batch';

const COLLECTION_NAME = 'batches';

export const subscribeToBatches = (onUpdate: (batches: Batch[]) => void) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot: QuerySnapshot) => {
        const batches: Batch[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Batch));
        onUpdate(batches);
    });
};

export const addBatch = async (batchData: Omit<Batch, 'id' | 'createdAt'>): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...batchData,
        createdAt: Timestamp.now(),
        status: 'MACERATION' // Default start status
    });
    return docRef.id;
};

export const updateBatchStatus = async (id: string, status: Batch['status']) => {
    const batchRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(batchRef, { status });
};
