export interface User {
    id?: number;
    name: string;
    email: string;
    username:string;
    first_name:string;
    last_name:string;
    date_of_birth:Date
    gender:string
    contact_number:string
    address:string
    password:string
    role_name:string
}

export interface LoginCredentials{
    email:string,
    password:string
} 
