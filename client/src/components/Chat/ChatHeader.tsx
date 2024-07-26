import { Chat, User } from '../../Context/ChatProvider';
import { getReceiver, getReceiverInfo } from '../../utils/chatUtils';
import { loggedInUser } from '../../services/chatService';

interface Props {
    selectedChat: Chat,
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>,
}

const ChatHeader = ({ selectedChat, setSelectedChat }: Props) => {
    let receiver = selectedChat.chatName;
    let receiverInfo: User = selectedChat.users[0];
    if (!selectedChat.isGroupChat) {
        receiver = getReceiver(loggedInUser, selectedChat.users);
        receiverInfo = getReceiverInfo(loggedInUser, selectedChat.users);
    }

    return (
        <>
            <div className='bg-gray-500 rounded-md p-1 flex space-x-3 justify-start items-center'>
                <i onClick={() => setSelectedChat(undefined)} className="fa-solid fa-arrow-left text-4xl text-black rounded-full cursor-pointer hover:bg-white p-3"></i>
                <img className='w-12 h-12 rounded-full object-cover' src={receiverInfo.pic}></img>
                <span className='text-4xl'>{receiver}</span>
            </div>
        </>
    )
}

export default ChatHeader;