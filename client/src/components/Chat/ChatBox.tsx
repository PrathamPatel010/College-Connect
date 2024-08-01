import { ChatState } from "../../Context/ChatProvider";
import SendButton from "../../utils/sendButton";
import { Input } from "../ui/input";
import ChatHeader from "./ChatHeader";
import ScrollableChat from "./ScrollableChat";

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
            {selectedChat && (<ScrollableChat />)}
            {selectedChat && (
                <div className="sticky bottom-0 flex w-full items-center space-x-2">
                    <Input className="rounded-md bg-white text-black" type="text" placeholder="Type a message.." />
                    <SendButton />
                </div>
            )}
        </div>
    );
};

export default ChatBox;
