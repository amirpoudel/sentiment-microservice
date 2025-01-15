import { BulkReviews, BulkReviewsProcessResponse, ProcessReviewsGetQueryOptions, Review, ReviewProcessResponse } from "../entities/process";
import { produceMessage } from "../infrastructure/external-service/kafka/producer.kafka";
import { IProcessReviewRepository, IProcessReviewService } from "../interface/process.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";
import crypto from 'crypto'
import fs from 'fs'
import csvParser from "csv-parser";

export  class ProcessReviewService implements IProcessReviewService {

        private repository: IProcessReviewRepository;
        constructor(repository:IProcessReviewRepository){
            this.repository = repository;
        }

        insertBulkReview  = trycatchWrapper(async(bulkReviews:BulkReviews):Promise<BulkReviewsProcessResponse>=>{
            
            const processId = crypto.randomUUID();
            let totalProcessCount = 0;
            let totalInputLength = 0;

            await Promise.all(
                bulkReviews.reviews.map(async (review) => {
                    produceMessage('reviews', JSON.stringify({ processId, ...review }));
                    totalProcessCount ++;
                    totalInputLength += review.review.length;
                })
            );

            await this.repository.insertProcessMetadata({
                id:processId,
                userId:bulkReviews.userId,
                isProcessFromFile:false,
                isBulkProcess:true,
                totalProcessCount: totalProcessCount,
                totalInputLength:totalInputLength
            })


            return { processId };

        })

        insertReview  = trycatchWrapper(async(userId:string,review:Review):Promise<ReviewProcessResponse>=>{
            // insert single review
            const processId  = crypto.randomUUID()
            console.log(review)
            await produceMessage('reviews',JSON.stringify({
                processId,
                userId,
                ...review
            }))
            await this.repository.insertProcessMetadata({
                id:processId,
                userId:userId,
                isProcessFromFile:false,
                isBulkProcess:false,
                totalProcessCount: 1,
                totalInputLength:review.review.length
            })
            
            // store in db . 
            return {processId}
            
        })


        processCSVFile = trycatchWrapper(async(filePath:string,userId:string)=>{
            // process csv file using stream and push all data to kafka
            const stream = fs.createReadStream(filePath).pipe(csvParser())
            const processId  = crypto.randomUUID()
            let totalProcessCount = 0;
            let totalInputLength = 0;
    
            stream.on("data",async (row)=>{
                console.log("Row : ",row)
                // push each row to kafka
                const data = {
                    processId,
                    userId,
                    ...row
                }
                await produceMessage('reviews' ,JSON.stringify(data))
                totalProcessCount ++
                totalInputLength += row.review?.length;
                
            })
    
            stream.on("error",()=>{
                console.log("File Reading Error")
            })
    
            stream.on("end",()=>{
                console.log("file read done")
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                        return;
                    }
                    console.log('File deleted successfully!');
                });
            })
            await this.repository.insertProcessMetadata({
                id:processId,
                userId:userId,
                isProcessFromFile:false,
                isBulkProcess:true,
                totalProcessCount: totalProcessCount,
                totalInputLength:totalInputLength
            })
        })

        getProcessMetadata = trycatchWrapper(async(query:ProcessReviewsGetQueryOptions)=>{
            return await this.repository.getProcessMetadata(query)
        })




}