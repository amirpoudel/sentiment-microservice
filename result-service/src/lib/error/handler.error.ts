import { Request,Response,NextFunction } from 'express';
import { AppError } from './app.error';


export const expressErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {   
   
    let statusCode = 500;
    let message = "Something went wrong";
    let error = "Internal Server Error";
    let errors = [];
    let status = "fail";
    if (err instanceof AppError) {
        
        statusCode = err.statusCode;
        message = err.message;
        error = JSON.stringify(err.error);
        errors = err.errors;
     
    }

    let errorResponse ={
        status: statusCode,
        data:{
            message:message,
            error:error,
            errors:errors
        },
        isError:true
    }
    console.log(err)

    return res.status(Number(statusCode)).json({
        error: errorResponse
    })
};