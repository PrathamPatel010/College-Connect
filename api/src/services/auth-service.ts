import UserRepository from "../repository/user-repository";
import {CreateUserDto, SignInUserDto} from "../dto/user-dto";
import {generateToken} from "../utils/generate-token";

const userRepo = new UserRepository();

class AuthService{
    async signUpUser(data:CreateUserDto){
        try{
            const res = await userRepo.create(data);
            return res;
        } catch (error){
            console.log(`Error occurred at Auth Service in signup`);
            throw error;
        }
    }

    async signInUser(data:SignInUserDto){
        try{
            let res = await userRepo.signIn(data);
            const token = generateToken(res);
            res = {...res,token};
            return res;
        } catch (error){
            console.log(`Error occurred at Auth Service in signup`);
            throw error;
        }
    }
}

export default AuthService;
