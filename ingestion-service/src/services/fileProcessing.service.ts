import { trycatchWrapper } from "../lib/async/trycatch.async"




export default class FileProcessingService{

    constructor(){

    }

    processCSVFile = trycatchWrapper(async()=>{
        // process csv file using stream and push all data to kafka
    })

}