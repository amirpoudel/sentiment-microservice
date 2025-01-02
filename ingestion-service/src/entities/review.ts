
export interface Review{
    reviewId?:string; //custom field for users to provide their own review id 
    review:string;   
}

export interface BulkReviews {
    reviews: Review[];
}


export interface ReviewProcessResponse{
    processId: string
}

export interface BulkReviewsProcessResponse{
    processId: string
}

