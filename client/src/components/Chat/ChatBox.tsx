import { ChatState } from "../../Context/ChatProvider"
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
    const { selectedChat, setSelectedChat } = ChatState();
    const text = selectedChat ? '' : 'Click on user to start chatting';
    return (
        <>
            {selectedChat && <ChatHeader selectedChat={selectedChat} setSelectedChat={setSelectedChat} />}
            <div className={`${selectedChat ? '' : 'hidden md:flex'} flex flex-col w-full bg-gray-400 rounded-md h-screen items-center ${!selectedChat ? 'justify-center' : ''}`}>
                <p className="text-black text-4xl">{text}</p>
            </div>
        </>
    );
};

export default ChatBox;
