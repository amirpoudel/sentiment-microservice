

export interface Review {
    id: string;
    bulkProcessId: string;
    userId: string;
    title: string;
    sentiment: string;
    score?: number;
    remarks?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface ReviewCreateInput extends Omit<Review, 'id' | 'createdAt' | 'updatedAt'> {}



