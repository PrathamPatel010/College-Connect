import { User } from "../../Context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    user: User,
    onClick: () => void,
}
const UserListItem = ({ user, onClick }: Props) => {
    return (
        <div onClick={onClick} className="hover:bg-gray-500 mt-5 flex justify-start items-center space-x-5 rounded-sm px-2 py-2">
            <Avatar>
                <AvatarImage src={user?.pic} />
                <AvatarFallback>{user?.username[0]}</AvatarFallback>
            </Avatar>
            <div>{user.username}</div>
        </div>
    )
}

export default UserListItem;