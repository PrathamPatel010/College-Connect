import prismaService from "../config/dbConfig";
import {BadRequestError, NotFoundError} from "../utils/error-handler/AppError";
import {CreateUserDto,SignInUserDto} from "../dto/user-dto";
import argon2 from 'argon2';
import {User} from "@prisma/client";
class UserRepository{
    async userExist(userData:{username?:string,email?:string}){
        const userExist = await prismaService.user.findFirst({
            where:{
                OR:[
                    {username:userData?.username},
                    {email:userData?.email}
                ]
            }
        });
        if (userExist){
            return userExist as User;
        }
    }

    async create(userData: CreateUserDto) {
        try {
            const userExist = await this.userExist(userData);
            if (userExist){
                throw new BadRequestError("User already exist!!");
            }
            userData.password = await argon2.hash(userData.password);
            const user = await prismaService.user.create({
                data:userData,
                select:{
                    id:true,email:true,username:true,pic:true,isVerified:true
                }
            });
            return user;
        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }

    async signIn(userData:SignInUserDto){
        try {
            const user = await this.userExist(userData);
            if (!user){
                throw new NotFoundError("No User found with given email");
            }
            const passCheck = await argon2.verify(user.password,userData.password);
            if (!passCheck){
                throw new BadRequestError("Wrong Credentials");
            }
            const response:any = {id:user.id,email: user.email,username:user.username,pic:user.pic,isVerified:user.isVerified};
            return response;
        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }
}

export default UserRepository;