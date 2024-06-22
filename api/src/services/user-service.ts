import 'colors';
import UserRepository from '../repository/user-repository';
import {LoggedInUserDto} from "../dto/user-dto";

const repo = new UserRepository();

class UserService {
    async searchUsers(filter, loggedInUser: LoggedInUserDto | undefined) {
        try {
            const filters = {username:filter.username,loggedInUser};
            const users = await repo.searchUsers(filters);
            return users;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default UserService;
