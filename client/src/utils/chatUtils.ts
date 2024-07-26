import { User } from "../Context/ChatProvider";

export function getReceiver(loggedInUser: User | undefined, users: User[]) {
    return users[0]?.id === loggedInUser?.id ? users[1].username : users[0].username;
}

export function getReceiverInfo(loggedInUser: User | undefined, users: User[]) {
    return users[0]?.id === loggedInUser?.id ? users[1] : users[0];
}