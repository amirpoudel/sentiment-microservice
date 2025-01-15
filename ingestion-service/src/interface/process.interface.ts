import { BulkReviews, BulkReviewsProcessResponse, ProcessCreateInput, ProcessReviewsGetQueryOptions, Review, ReviewProcessResponse } from "../entities/process"

export interface IProcessReviewService{

    insertBulkReview(bulkReview:BulkReviews):Promise<ReviewProcessResponse>

    insertReview(userId:string,review:Review):Promise<BulkReviewsProcessResponse>

    processCSVFile(filePath:string,userId:string):Promise<void>

    getProcessMetadata(query:ProcessReviewsGetQueryOptions):Promise<any>

}


export interface IProcessReviewRepository{
    
    insertProcessMetadata(input:ProcessCreateInput):Promise<any>

    getProcessMetadata(query:ProcessReviewsGetQueryOptions):Promise<any>
    

}
