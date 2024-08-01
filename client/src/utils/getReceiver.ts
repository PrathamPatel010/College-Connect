import { User } from "../Context/ChatProvider";

export async function getReceiver(users: User[], loggedInUser: User) {
    const res = (users[0].id === loggedInUser.id) ? users[1] : users[0];
    return res;
}