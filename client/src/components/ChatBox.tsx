import { ChatState } from "../Context/ChatProvider";

const ChatBox = () => {
    const { selectedChat } = ChatState();

    return (
        <div className={`${selectedChat ? 'block' : 'hidden md:block'} flex flex-col w-full bg-gray-400 rounded-md h-screen justify-center items-center`}>
            Chat Box
        </div>
    );
};

export default ChatBox;
