import { User } from "../../Context/ChatProvider";

interface Props {
    user: User,
    onClick?: (user: User) => void,
}
const UserBadgeInGroupChat = ({ user, onClick }: Props) => {
    return (
        <div className="flex justify-between items-center space-x-2 bg-gray-500 w-fit p-2 rounded-md">
            <span>{user.username}</span>
            <i onClick={() => onClick && onClick(user)} className="fa-solid fa-rectangle-xmark cursor-pointer"></i>
        </div>
    )
}

export default UserBadgeInGroupChat;