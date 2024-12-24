import { IFileProcessingService } from "../interface/fileProcessing.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async"
import fs from 'fs'
import csvParser from "csv-parser";




export default class FileProcessingService implements IFileProcessingService{

    constructor(){

    }

    processCSVFile = trycatchWrapper(async(filePath:string)=>{
        // process csv file using stream and push all data to kafka
        const stream = fs.createReadStream(filePath).pipe(csvParser())
        stream.on("data",(row)=>{
            console.log("Row : ",row)
            // push each row to kafka
            
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