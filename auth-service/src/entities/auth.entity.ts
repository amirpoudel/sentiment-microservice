
export interface Auth{
    id: string;
    name: string;
    email: string;
    phoneNumber?:string;
    password:string;
    address?: string;
    profileImage?: string;

    createdAt?:string;
    updatedAt?:string;
}


export interface UserCreateInput extends Omit<Auth, 'id' | 'createdAt' | 'updatedAt'>{

}


export interface UsersGetQueryOptions{
    limit:number;
    offset:number;
    search?:string;
    filter?:{
        userId?:string
    },
    sort?:{
        field:string
        order:'asc' | 'desc'
    }
}


export interface UserGRPCResponse{
    id: string,
    name:string,
    email:string,
    password:string
}

export interface LoginResponse{
    id:string,
    name:string,
    email:string,
    accessToken:string
}

export interface VerifyTokenResponse{
    id:string,
    name:string,
    email:string
}