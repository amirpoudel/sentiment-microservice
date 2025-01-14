import { BulkReviews, BulkReviewsProcessResponse, Review, ReviewProcessResponse } from "../entities/review";
import { produceMessage } from "../infrastructure/external-service/kafka/producer.kafka";
import { IProcessReviewService } from "../interface/process.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";
import crypto from 'crypto'
import fs from 'fs'
import csvParser from "csv-parser";


export  class ProcessReviewService implements IProcessReviewService {

        insertBulkReview  = trycatchWrapper(async(bulkReviews:BulkReviews):Promise<BulkReviewsProcessResponse>=>{
            
            const processId = crypto.randomUUID();

            await Promise.all(
                bulkReviews.reviews.map(async (review) => {
                    produceMessage('reviews', JSON.stringify({ processId, ...review }));
                })
            );

            return { processId };

        })

        insertReview  = trycatchWrapper(async(review:Review):Promise<ReviewProcessResponse>=>{
            // insert single review
            const processId  = crypto.randomUUID()
            await produceMessage('reviews',JSON.stringify({
                processId,
                ...review
            }))
            return {processId}
            
        })


        processCSVFile = trycatchWrapper(async(filePath:string,bulkProcessId:string)=>{
            // process csv file using stream and push all data to kafka
            const stream = fs.createReadStream(filePath).pipe(csvParser())
    
            stream.on("data",async (row)=>{
                console.log("Row : ",row)
                // push each row to kafka
                const data = {
                    bulkProcessId,
                    ...row
                }
                await produceMessage('reviews' ,JSON.stringify(data))
                
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
    
    
            
        })




}