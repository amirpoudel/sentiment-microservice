import { AppError } from "backend-error-handler";
import { userStub } from "./grpc.server";


export async function findUser(email:string){
   // userStub.getUserByEmail({email:email})
    await userStub.getUserByEmail({email:email},(err:any,user:any)=>{
        if(err){
            console.log(err)
            throw AppError.notFound("User Not Found")
        }
        console.log('User Found')
        console.log(user)
        return user
    })
    
    
}