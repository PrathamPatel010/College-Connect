import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";

const ChatPage = () => {
    return (
        <main>
            <SideDrawer />
            <section className="flex justify-between p-2">
                <MyChats />
                <ChatBox />
            </section>
        </main>
    )
}

export default ChatPage;