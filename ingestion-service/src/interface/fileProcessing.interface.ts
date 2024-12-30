

export interface IFileProcessingService{

    processCSVFile(filePath:string,bulkProcessId:string):Promise<void>

}