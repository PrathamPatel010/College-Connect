import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
    const { selectedChat } = ChatState();

    return (
        <main>
            <SideDrawer />
            <section className="flex flex-col md:flex-row mt-3">
                <div className={`w-full ${selectedChat ? 'hidden' : 'block'} md:block md:w-2/6`}>
                    <MyChats />
                </div>
                <div className={`w-full ${selectedChat ? 'block' : 'hidden'} md:block md:w-5/6`}>
                    <ChatBox />
                </div>
            </section>
        </main>
    );
};

export default ChatPage;
