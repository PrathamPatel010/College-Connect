import { Message } from "../../config/types";
import { loggedInUser } from "../../services/chatService";

interface Props {
    message: Message,
}

const MessageBox = ({ message }: Props) => {
    const isSender = message.sender.id === loggedInUser.id;
    return (
        <div key={message.id} className={`flex p-1 ${isSender ? 'justify-end' : ''}`}>
            <span className={`p-3 ${isSender ? 'bg-green-900' : 'bg-blue-900'} rounded-lg`}>
                {message.content}
            </span>
        </div >
    )
}

export default MessageBox;