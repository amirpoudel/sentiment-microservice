

export interface Review {
    id: string;
    processId: string;
    reviewId: string;
    review: string;
    sentiment: string;
    score?: number;
    remarks?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ReviewCreateInput extends Omit<Review, 'id' | 'createdAt' | 'updatedAt'> {}



export interface ReviewsGetResponse{
    reviews: Review[]
    total:number
}


export interface ReviewsGetQueryOptions{
    limit:number;
    offset:number;
    search?:string;
    filter?:{
        processId?:string
        sentiment?:string
    },
    sort?:{
        field:string
        order:'asc' | 'desc'
    }
}