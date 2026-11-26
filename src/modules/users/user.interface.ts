export interface IUser {
    name: string,
    email: string,
    password: string,
    age?: number,
    is_Active:boolean
}

export type IUpdateUser = Partial<IUser>;

export interface LUser {
    email:string,
    password : string
}