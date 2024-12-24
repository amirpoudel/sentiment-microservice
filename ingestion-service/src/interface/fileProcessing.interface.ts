

export interface IFileProcessingService{

    processCSVFile(filePath:string):Promise<void>

}