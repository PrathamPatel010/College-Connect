export type CreateUserDto = {
    email: string;
    username: string;
    password: string;
    pic?: string;
    isVerified?: boolean;
}

export type SignInUserDto = {
    email: string,
    password: string,
}

export type LoggedInUserDto = {
    id:number,
    email:string,
    username:string,
    pic:string|null,
    isVerified:boolean
}

export type SearchUsersDto = {
    username:string,
    loggedInUser?:LoggedInUserDto,
}