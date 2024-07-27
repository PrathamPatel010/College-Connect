import { Chat, User } from '../../Context/ChatProvider';
import { getReceiver, getReceiverInfo } from '../../utils/chatUtils';
import { loggedInUser } from '../../services/chatService';
import { useState } from 'react';
import UpdateGroupChatModal from '../Modal/UpdateGroupChatModal';

interface Props {
    selectedChat: Chat,
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>,
}

const ChatHeader = ({ selectedChat, setSelectedChat }: Props) => {
    const [isUpdateGcOpen, setIsUpdateGcOpen] = useState(false);
    let receiver = selectedChat.chatName;
    let receiverInfo: User = selectedChat.users[0];
    if (!selectedChat.isGroupChat) {
        receiver = getReceiver(loggedInUser, selectedChat.users);
        receiverInfo = getReceiverInfo(loggedInUser, selectedChat.users);
    }

    return (
        <>
            <div className='bg-gray-500 rounded-md p-1 flex justify-between items-center'>
                <div className='flex space-x-3 items-center'>
                    <i onClick={() => setSelectedChat(undefined)} className="fa-solid fa-arrow-left text-4xl text-black rounded-full cursor-pointer hover:bg-white p-3"></i>
                    <img className='w-12 h-12 rounded-full object-cover' src={receiverInfo.pic} alt={`${receiver} Profile`} />
                    <span className='text-4xl'>{receiver}</span>
                </div>
                {selectedChat.isGroupChat && selectedChat.groupAdminId === loggedInUser.id && (
                    <i onClick={() => setIsUpdateGcOpen(true)} className="fa-solid fa-pencil text-4xl cursor-pointer text-black rounded-full hover:bg-white p-3"></i>
                )}
                <UpdateGroupChatModal selectedChat={selectedChat} isUpdateGcOpen={isUpdateGcOpen} setIsUpdateGcOpen={setIsUpdateGcOpen} setSelectedChat={setSelectedChat} />
            </div >
        </>
    )
}

export default ChatHeader;
