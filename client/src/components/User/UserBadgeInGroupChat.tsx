import { User } from "../../Context/ChatProvider";

interface Props {
    user: User,
}
const UserBadgeInGroupChat = ({ user }: Props) => {
    return (
        <div className="flex justify-between items-center space-x-2 bg-gray-500 w-fit p-2 rounded-md">
            <span>{user.username}</span>
            <i className="fa-solid fa-rectangle-xmark"></i>
        </div>
    )
}

export default UserBadgeInGroupChat;