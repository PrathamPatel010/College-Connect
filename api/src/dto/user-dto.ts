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