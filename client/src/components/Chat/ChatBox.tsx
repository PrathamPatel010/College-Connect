import { ChatState } from "../../Context/ChatProvider";
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
    const { selectedChat, setSelectedChat } = ChatState();
    const text = "Click on chat to start chatting";

    return (
        <div className="h-full flex flex-col">
            {!selectedChat && (
                <div className="h-lvh flex justify-center items-center">
                    {text}
                </div>
            )}
            {selectedChat && (
                <ChatHeader selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            )}
            <div className="bg-gray-400 flex-1 overflow-y-auto">
                Your messages content here
            </div>
        </div>
    );
};

export default ChatBox;
