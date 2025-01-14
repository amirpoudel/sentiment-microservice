import { BulkReviews, BulkReviewsProcessResponse, ProcessCreateInput, Review, ReviewProcessResponse } from "../entities/review"

export interface IProcessReviewService{

    insertBulkReview(bulkReview:BulkReviews):Promise<ReviewProcessResponse>

    insertReview(userId:string,review:Review):Promise<BulkReviewsProcessResponse>

    processCSVFile(filePath:string,userId:string):Promise<void>

}


export interface IProcessReviewRepository{
    
    insertProcessMetadata(input:ProcessCreateInput):Promise<any>
    

}
