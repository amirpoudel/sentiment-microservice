
export interface Process{
    id:string,
    userId:string,
    isProcessFromFile:boolean,
    isBulkProcess:boolean,
    totalProcessCount:number,
    totalInputLength:number,
    createdAt: string,
    updatedAt: string,

}


export interface ProcessCreateInput extends Omit<Process,'createdAt' | 'updatedAt'>{

}




export interface Review{
    reviewId?:string; //custom field for users to provide their own review id 
    review:string;   
}

export interface BulkReviews {
    userId:string,
    reviews: Review[];
}


export interface ReviewProcessResponse{
    processId: string
}

export interface BulkReviewsProcessResponse{
    processId: string
}



export interface ProcessReviewsGetQueryOptions{
    limit:number;
    offset:number;
    search?:string;
    filter?:{
        userId?:string
    },
    sort?:{
        field:string
        order:'asc' | 'desc'
    }
}