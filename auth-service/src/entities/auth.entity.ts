
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