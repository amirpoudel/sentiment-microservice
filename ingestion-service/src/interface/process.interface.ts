import { BulkReviews, BulkReviewsProcessResponse, ProcessCreateInput, Review, ReviewProcessResponse } from "../entities/review"

export interface IProcessReviewService{

    insertBulkReview(bulkReview:BulkReviews):Promise<ReviewProcessResponse>

    insertReview(review:Review):Promise<BulkReviewsProcessResponse>

    processCSVFile(filePath:string,bulkProcessId:string):Promise<void>

}


export interface IProcessReviewRepository{
    
    insertProcessMetadata(input:ProcessCreateInput):Promise<any>
    

}
