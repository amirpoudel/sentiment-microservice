

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



export interface ReviewsQuery {
    limit: number;
    offset: number;
    filter?: { 
        bulkProcessId?: string;
    }
    sort?: {
        field: string;
        order: 'asc' | 'desc'; 
    }

}


