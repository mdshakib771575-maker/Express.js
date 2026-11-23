export interface IUser {
    name: string,
    email: string,
    password: string | number,
    age?: number,
    is_Active:boolean
}

export type IUpdateUser = Partial<IUser>;