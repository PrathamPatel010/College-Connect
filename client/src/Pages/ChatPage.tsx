import ChatBox from "../components/Chat/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
    const { selectedChat } = ChatState();

    return (
        <main className="h-screen">
            <SideDrawer />
            <section className="flex flex-col space-x-1 md:flex-row mt-3 h-full">
                <div className={`w-full ${selectedChat ? 'hidden' : 'block'} md:block md:w-2/6 h-full`}>
                    <MyChats />
                </div>
                <div className={`w-full ${selectedChat ? 'block' : 'hidden'} md:block md:w-5/6 h-full`}>
                    <ChatBox />
                </div>
            </section>
        </main>
    );
};

export default ChatPage;
